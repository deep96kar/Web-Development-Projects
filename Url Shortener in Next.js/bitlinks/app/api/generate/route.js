import clientPromise from "@/lib/mongodb";

export async function POST(request) {
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

  if (!/^[a-zA-Z0-9_-]{1,50}$/.test(shorturl)) {
    return Response.json(
      {
        success: false,
        error: true,
        message: "Invalid shorturl (use letters, numbers, - or _)",
      },
      { status: 400 },
    );
  }

  const normalizeUrl = (input) => {
    const hasScheme = /^https?:\/\//i.test(input);
    if (hasScheme) return input;

    // If user types 'localhost:3000/..' or '127.0.0.1:3000/..', prefer http.
    const looksLocal =
      /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|192\.168\.|10\.|172\.(1[6-9]|2\d|3[0-1])\.)/i.test(
        input,
      );
    return `${looksLocal ? "http" : "https"}://${input}`;
  };

  let normalizedUrl;
  try {
    const candidate = normalizeUrl(rawUrl);
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("Only http(s) URLs are allowed");
    }

    const host = request.headers.get("host");
    if (host && parsed.host === host && parsed.pathname === `/${shorturl}`) {
      return Response.json(
        {
          success: false,
          error: true,
          message: "This short link would redirect to itself",
        },
        { status: 400 },
      );
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

  // Check if the short url exists
  const doc = await collection.findOne({ shorturl });
  if (doc) {
    return Response.json({
      success: false,
      error: true,
      message: "URL already exists!",
    });
  }

  const result = await collection.insertOne({
    url: normalizedUrl,
    shorturl,
  });

  return Response.json({
    success: true,
    error: false,
    message: "URL Generated Successfully",
  });
}
