# c:/Users/deep9/Downloads/ai/.venv/Scripts/python.exe -u "c:\Users\deep9\Downloads\ai\from gtts import gTTS.py" 

import asyncio
from pathlib import Path
import re

import edge_tts
import numpy as np
from moviepy import AudioFileClip, ColorClip, CompositeVideoClip, ImageClip
from moviepy.video.fx import CrossFadeIn, CrossFadeOut, FadeIn, FadeOut
from PIL import Image, ImageDraw, ImageFont

# 🎙️ Script (shortened for ~15 sec)
text = """নমস্কার বোলপুরবাসী।
রবীন্দ্রনাথের মাটি এবার সাক্ষী হবে ডিজিটাল বিপ্লবের।
২৬ এপ্রিল Social Media Influencers Meet 2026।
সকাল ১০টা, শান্তিনিকেতন মেডিকেল কলেজে।
নিজের শহর থেকে বিশ্বে পৌঁছানোর সুযোগ।
Ekdunia.com এর হাত ধরো, এগিয়ে চলো।"""

VIDEO_SIZE = (1536, 1024)
IMAGE_DIR = Path("images")
SECONDARY_IMAGE_DIR = Path("img")
MANUAL_IMAGE_PATH = None
TRANSITION_SEC = 0.35
VOICE_NAME = "bn-IN-BashkarNeural"
VOICE_RATE = "-4%"
VOICE_PITCH = "-2Hz"
VOICE_VOLUME = "+0%"


def natural_sort_key(path_obj):
    parts = re.split(r"(\d+)", path_obj.stem.lower())
    key = []
    for part in parts:
        if part.isdigit():
            key.append(int(part))
        else:
            key.append(part)
    key.append(path_obj.suffix.lower())
    return tuple(key)


def get_image_files(manual_path=None):
    exts = {".jpg", ".jpeg", ".png", ".webp"}
    files = []

    if manual_path:
        manual = Path(manual_path)
        if manual.exists() and manual.suffix.lower() in exts:
            files.append(manual)

    search_dirs = [SECONDARY_IMAGE_DIR, IMAGE_DIR]
    for directory in search_dirs:
        if not directory.exists() or not directory.is_dir():
            continue
        for item in sorted(directory.iterdir(), key=natural_sort_key):
            if item.is_file() and item.suffix.lower() in exts:
                files.append(item)

    for name in ["image.jpg", "image.jpeg", "image.png", "background.jpg", "background.jpeg", "background.png"]:
        path = Path(name)
        if path.exists() and path.suffix.lower() in exts:
            files.append(path)

    # Keep order but remove duplicates.
    unique = []
    seen = set()
    for p in files:
        key = str(p.resolve())
        if key not in seen:
            unique.append(p)
            seen.add(key)

    return unique


def image_to_vertical_frame(image_path, size=VIDEO_SIZE):
    target_w, target_h = size
    image = Image.open(image_path).convert("RGB")
    src_w, src_h = image.size

    # Resize image to fully cover vertical frame, then center-crop.
    scale = max(target_w / src_w, target_h / src_h)
    resized_w = int(src_w * scale)
    resized_h = int(src_h * scale)
    image = image.resize((resized_w, resized_h), Image.Resampling.LANCZOS)

    left = (resized_w - target_w) // 2
    top = (resized_h - target_h) // 2
    image = image.crop((left, top, left + target_w, top + target_h))

    return np.array(image)


def create_animated_image_clip(image_path, duration, size=VIDEO_SIZE, index=0):
    frame = image_to_vertical_frame(image_path, size=size)
    base = ImageClip(frame).with_duration(duration).with_position("center")

    # Ken Burns style: slow zoom + subtle vertical drift.
    drift_direction = -1 if index % 2 == 0 else 1
    zoomed = base.resized(lambda t: 1.02 + 0.10 * (t / max(duration, 0.001)))
    return zoomed.with_position(lambda t: ("center", int(drift_direction * 20 * (t / max(duration, 0.001)))))


def create_cinematic_overlay(size=VIDEO_SIZE):
    width, height = size
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    pixels = overlay.load()

    for y in range(height):
        top_strength = max(0, int(130 * (1 - y / (height * 0.40))))
        bottom_strength = max(0, int(150 * ((y - height * 0.60) / (height * 0.40))))
        alpha = max(top_strength, bottom_strength)
        if alpha <= 0:
            continue
        for x in range(width):
            pixels[x, y] = (0, 0, 0, min(alpha, 160))

    return np.array(overlay)


def create_slideshow_background(duration, size=VIDEO_SIZE, manual_path=None, transition=TRANSITION_SEC):
    images = get_image_files(manual_path)
    if not images:
        return ColorClip(size=size, color=(0, 0, 0), duration=duration)

    print("Image order:", [img.name for img in images])

    if len(images) == 1:
        clip = create_animated_image_clip(images[0], duration=duration, size=size, index=0)
        return clip.with_effects([FadeIn(min(0.4, duration / 4)), FadeOut(min(0.4, duration / 4))])

    clip_duration = (duration + transition * (len(images) - 1)) / len(images)
    step = clip_duration - transition

    layers = []
    for idx, image_path in enumerate(images):
        start_time = idx * step
        clip = create_animated_image_clip(image_path, duration=clip_duration, size=size, index=idx).with_start(start_time)

        effects = []
        if idx > 0:
            effects.append(CrossFadeIn(transition))
        if idx < len(images) - 1:
            effects.append(CrossFadeOut(transition))
        if effects:
            clip = clip.with_effects(effects)

        layers.append(clip)

    return CompositeVideoClip(layers, size=size).with_duration(duration)

def create_text_overlay_image(message, canvas_size=(1080, 1920), text_box_width=900):
    """Create a centered text overlay image without ImageMagick dependency."""
    image = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)

    font = None
    font_candidates = ["Nirmala.ttf", "NirmalaB.ttf", "arial.ttf", "seguiemj.ttf"]
    for font_name in font_candidates:
        try:
            font = ImageFont.truetype(font_name, 70)
            break
        except OSError:
            continue
    if font is None:
        font = ImageFont.load_default()

    lines = message.splitlines()
    line_spacing = 20
    measured = []
    total_height = 0

    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        line_width = bbox[2] - bbox[0]
        line_height = bbox[3] - bbox[1]

        if line_width > text_box_width and " " in line:
            words = line.split()
            current = ""
            for word in words:
                candidate = f"{current} {word}".strip()
                candidate_bbox = draw.textbbox((0, 0), candidate, font=font)
                candidate_width = candidate_bbox[2] - candidate_bbox[0]
                if candidate_width <= text_box_width:
                    current = candidate
                else:
                    measured.append((current, draw.textbbox((0, 0), current, font=font)))
                    current = word
            measured.append((current, draw.textbbox((0, 0), current, font=font)))
        else:
            measured.append((line, bbox))

    for _, bbox in measured:
        total_height += (bbox[3] - bbox[1]) + line_spacing

    y = (canvas_size[1] - total_height) // 2
    for line, bbox in measured:
        width = bbox[2] - bbox[0]
        x = (canvas_size[0] - width) // 2
        rect_padding_x = 24
        rect_padding_y = 14
        rect = (
            x - rect_padding_x,
            y - rect_padding_y,
            x + width + rect_padding_x,
            y + (bbox[3] - bbox[1]) + rect_padding_y,
        )
        draw.rounded_rectangle(rect, radius=18, fill=(0, 0, 0, 125))
        draw.text((x + 2, y + 2), line, font=font, fill=(0, 0, 0, 200))
        draw.text((x, y), line, font=font, fill=(255, 255, 255, 255))
        y += (bbox[3] - bbox[1]) + line_spacing

    return np.array(image)


def split_sentences(script_text):
    parts = re.split(r"[।.!?\n]+", script_text)
    return [part.strip() for part in parts if part.strip()]


def create_caption_clips(script_text, total_duration, size=VIDEO_SIZE):
    sentences = split_sentences(script_text)
    if not sentences:
        return []

    part_duration = total_duration / len(sentences)
    clips = []
    for idx, sentence in enumerate(sentences):
        overlay = create_text_overlay_image(sentence, canvas_size=size, text_box_width=900)
        start = idx * part_duration
        clip = (
            ImageClip(overlay)
            .with_start(start)
            .with_duration(part_duration)
            .with_position(("center", int(size[1] * 0.70)))
            .with_effects([FadeIn(min(0.25, part_duration / 3)), FadeOut(min(0.25, part_duration / 3))])
        )
        clips.append(clip)

    return clips


async def generate_male_voice_bn(script_text, output_file):
    # Bengali male neural voice from Microsoft Edge TTS
    communicator = edge_tts.Communicate(
        text=script_text,
        voice=VOICE_NAME,
        rate=VOICE_RATE,
        pitch=VOICE_PITCH,
        volume=VOICE_VOLUME,
    )
    await communicator.save(output_file)


# 🔊 Generate Voice (Bengali male)
asyncio.run(generate_male_voice_bn(text, "voice.mp3"))

# 🎵 Load Audio
audio = AudioFileClip("voice.mp3")
video_duration = audio.duration

# 📱 Create Vertical Video (Reel size) from image set if available
video = create_slideshow_background(
    duration=video_duration,
    size=VIDEO_SIZE,
    manual_path=MANUAL_IMAGE_PATH,
)

# 📝 Add sentence-wise captions based on script analysis
caption_clips = create_caption_clips(text, total_duration=video_duration, size=VIDEO_SIZE)

# 🎞️ Cinematic readability overlay
cinematic_overlay = ImageClip(create_cinematic_overlay(VIDEO_SIZE)).with_duration(video_duration)

# 🎬 Combine
final = CompositeVideoClip([video, cinematic_overlay, *caption_clips], size=VIDEO_SIZE)
final = final.with_audio(audio)

# 🎥 Export
final.write_videofile("bolpur_reel.mp4", fps=30)