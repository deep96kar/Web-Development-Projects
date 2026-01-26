import Link from "next/link";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function Page() {
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  const handles = await collection
    .find(
      {},
      {
        projection: {
          handle: 1,
          pic: 1,
          desc: 1,
        },
      },
    )
    .sort({ handle: 1 })
    .limit(100)
    .toArray();

  const cleanHandles = (handles || []).filter((h) => h?.handle);

  return (
    <main className="min-h-screen bg-[#254f1a] text-yellow-100">
      <section className="max-w-345 mx-auto pt-45 px-6 lg:px-10">
        <h1 className="text-3xl lg:text-5xl font-bold">All Handles</h1>
        <p className="mt-3 text-lg text-yellow-100/80">
          Browse all created Linktree handles.
        </p>

        {cleanHandles.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-yellow-200/20 bg-white/5 p-6">
            No handles found yet.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cleanHandles.map((h) => (
              <div
                key={String(h._id)}
                className="rounded-2xl border border-yellow-200/20 bg-white/5 p-6 hover:bg-white/10 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={h.pic || "/home.png"}
                      alt={h.handle}
                      className="h-16 w-16 rounded-full object-cover bg-white/10"
                    />
                    <div className="min-w-0">
                      <div className="text-xl font-bold truncate">
                        @{h.handle}
                      </div>
                      {h.desc ? (
                        <div className="mt-1 text-yellow-100/80 truncate">
                          {h.desc}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex gap-3 sm:justify-end shrink-0">
                    <Link
                      href={`/${encodeURIComponent(h.handle)}`}
                      className="ui-btn-primary"
                    >
                      View
                    </Link>
                    <Link
                      href={`/handle/${encodeURIComponent(h.handle)}/edit`}
                      className="ui-btn-accent"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
