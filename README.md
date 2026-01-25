# Web Development Projects

Collection of small-to-medium web projects and demos created while learning HTML, CSS, JavaScript, React (Vite), and Next.js.

## Purpose

- Quick demos and UI clones to practice layout, responsiveness, and JavaScript interactivity.
- Self-contained projects you can open, run, and modify to learn specific techniques.

## Repository structure (top-level)

```
web development projects/
 ┣ Add & remove files from folders/                 # utility scripts and sample assets
 ┣ Amazon clone/                                    # static HTML/CSS UI demo
 ┣ clock/                                           # clock demo (HTML/CSS/JS)
 ┣ Currency Converter/                              # converter UI with country data
 ┣ Finance Calculator/                              # calculator UI (HTML/CSS/JS)
 ┣ Mobile clone/                                    # responsive mobile UI demo
 ┣ Netflix Clone/                                   # layout prototype with assets/
 ┣ Password Manager/                                # Vite + React password manager app
 ┣ Realtime-Streaming-website/                      # simple streaming demo (Node + browser)
 ┣ Rock , Paper and Scissor/                        # small JS game
 ┣ Spotipy clone in html & css and javascript/      # music UI + songs.json
 ┣ TIc Tac Toe game/                                # JS tic-tac-toe
 ┣ Todo list with html/                             # plain HTML/JS todo examples
 ┣ Todo list with React/                            # Vite + React todo app
 ┗ Url Shortener in Next.js/                        # Next.js URL shortener (bitlinks)
```

## Short descriptions

- **Add & remove files from folders/**: contains `organize.js` and `restore.js` for organizing file types into folders and restoring them.
- **Amazon clone/**, **Netflix Clone/**, **Mobile clone/**: static UI prototypes demonstrating layout, responsive design, and asset usage.
- **clock/**: small JS widget demonstrating time functions and DOM updates.
- **Currency Converter/**: client-side currency conversion demo using `country.js` and basic event handling.
- **Finance Calculator/**: a calculator-style mini project to practice input handling and DOM updates.
- **Spotipy clone...**: simple music player UI using `songs.json` and sample audio files.
- **Password Manager/** and **Todo list with React/**: modern React apps scaffolded with Vite.
- **Realtime-Streaming-website/**: basic Node + browser streaming demo (see `server.js` + `player.js`).
- **Url Shortener in Next.js/**: Next.js app in `bitlinks/` (includes API routes + DB utilities).

## How to run

### 1) Static HTML/CSS/JS projects

Open the project folder and open `index.html` in your browser.

### 2) Node / Vite / Next.js projects

Make sure Node.js is installed. Then run these inside the specific project folder that contains `package.json`.

```powershell
npm install
npm run dev
```

Notes:

- For **Realtime-Streaming-website/** you may need to run the server first:

```powershell
node server.js
```

- For **Url Shortener in Next.js/bitlinks/** you may need environment variables (e.g., MongoDB connection string). Check that project's README (if present) or `lib/mongodb.js`.

## Tips

- If a project needs assets (images, audio), make sure the `Assets/`, `public/`, or project asset folders are present.
- If you see a blank page, open DevTools Console and check for missing file paths.

## Contributions & next steps

- Add per-project `README.md` files (with run instructions + screenshots).
- Add a single PowerShell script to start all Vite/Next apps on different ports.

## License & reuse

These are learning projects — reuse and modify freely. If you'd like a specific license added (MIT/Apache/etc.), tell me which one.
