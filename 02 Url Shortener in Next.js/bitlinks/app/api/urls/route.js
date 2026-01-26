import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("bitlinks");
  const collection = db.collection("url");

  const docs = await collection
    .find({}, { projection: { url: 1, shorturl: 1 } })
    .sort({ _id: -1 })
    .toArray();

  const items = docs.map((d) => ({
    _id: d._id.toString(),
    url: d.url,
    shorturl: d.shorturl,
  }));

  return Response.json({ success: true, error: false, items });
}
