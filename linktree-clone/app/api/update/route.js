import clientPromise from "@/lib/mongodb";

export async function PUT(request) {
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

    const updateDoc = {
      links: Array.isArray(body?.links) ? body.links : [],
      pic: typeof body?.pic === "string" ? body.pic : "",
      desc: typeof body?.desc === "string" ? body.desc : "",
    };

    const result = await collection.updateOne(
      { handle },
      {
        $set: updateDoc,
      },
    );

    if (result.matchedCount === 0) {
      return Response.json({
        success: false,
        error: true,
        message: "Handle not found",
        result: null,
      });
    }

    return Response.json({
      success: true,
      error: false,
      message: "Your linktree has been updated!",
      result,
    });
  } catch (e) {
    return Response.json({
      success: false,
      error: true,
      message: "Failed to update linktree",
      result: null,
    });
  }
}
