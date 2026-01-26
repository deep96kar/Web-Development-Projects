import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const SHORT_RE = /^[a-zA-Z0-9_-]{1,50}$/;

const normalizeUrl = (input) => {
  const hasScheme = /^https?:\/\//i.test(input);
  if (hasScheme) return input;

  const looksLocal =
    /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|192\.168\.|10\.|172\.(1[6-9]|2\d|3[0-1])\.)/i.test(
      input,
    );

  return `${looksLocal ? "http" : "https"}://${input}`;
};

export async function PUT(request, { params }) {
  const { id } = await params;

  if (!id || typeof id !== "string" || !ObjectId.isValid(id)) {
    return Response.json(
      { success: false, error: true, message: "Invalid id" },
      { status: 400 },
    );
  }

  const json = await request.json().catch(() => null);
  const rawUrl = typeof json?.url === "string" ? json.url.trim() : "";
  const shorturl =
    typeof json?.shorturl === "string" ? json.shorturl.trim() : "";

  if (!rawUrl || !shorturl) {
    return Response.json(
      { success: false, error: true, message: "Missing url or shorturl" },
      { status: 400 },
    );
  }

  if (!SHORT_RE.test(shorturl)) {
    return Response.json(
      {
        success: false,
        error: true,
        message: "Invalid shorturl (use letters, numbers, - or _)",
      },
      { status: 400 },
    );
  }

  let normalizedUrl;
  try {
    const candidate = normalizeUrl(rawUrl);
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("Only http(s) URLs are allowed");
    }
    normalizedUrl = parsed.toString();
  } catch {
    return Response.json(
      {
        success: false,
        error: true,
        message: "Invalid URL. Include full domain like https://github.com",
      },
      { status: 400 },
    );
  }

  const client = await clientPromise;
  const db = client.db("bitlinks");
  const collection = db.collection("url");

  const _id = new ObjectId(id);
  const existing = await collection.findOne({ _id });
  if (!existing) {
    return Response.json(
      { success: false, error: true, message: "Link not found" },
      { status: 404 },
    );
  }

  if (existing.shorturl !== shorturl) {
    const conflict = await collection.findOne({ shorturl });
    if (conflict) {
      return Response.json(
        { success: false, error: true, message: "Short URL already exists" },
        { status: 409 },
      );
    }
  }

  await collection.updateOne(
    { _id },
    { $set: { url: normalizedUrl, shorturl } },
  );

  return Response.json({ success: true, error: false, message: "Updated" });
}

export async function DELETE(_request, { params }) {
  const { id } = await params;

  if (!id || typeof id !== "string" || !ObjectId.isValid(id)) {
    return Response.json(
      { success: false, error: true, message: "Invalid id" },
      { status: 400 },
    );
  }

  const client = await clientPromise;
  const db = client.db("bitlinks");
  const collection = db.collection("url");

  const _id = new ObjectId(id);
  const result = await collection.deleteOne({ _id });

  if (!result?.deletedCount) {
    return Response.json(
      { success: false, error: true, message: "Link not found" },
      { status: 404 },
    );
  }

  return Response.json({ success: true, error: false, message: "Deleted" });
}
