import clientPromise from "@/lib/mongodb";

export async function DELETE(request) {
  try {
    const body = await request.json();
    const handle = typeof body?.handle === "string" ? body.handle.trim() : "";

    if (!handle) {
      return Response.json({
        success: false,
        error: true,
        message: "Handle is required",
        result: null,
      });
    }

    const client = await clientPromise;
    const db = client.db("linktree");
    const collection = db.collection("links");

    const result = await collection.deleteOne({ handle });

    if (result.deletedCount === 0) {
      return Response.json({
        success: false,
        error: true,
        message: "Handle not found",
        result,
      });
    }

    return Response.json({
      success: true,
      error: false,
      message: "Linktree deleted permanently.",
      result,
    });
  } catch (e) {
    return Response.json({
      success: false,
      error: true,
      message: "Failed to delete linktree",
      result: null,
    });
  }
}
