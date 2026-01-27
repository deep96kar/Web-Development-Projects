import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

const normalizeHref = (href) => {
  if (typeof href !== "string") return "#";
  const trimmed = href.trim();
  if (!trimmed) return "#";
  if (trimmed.startsWith("/")) return trimmed;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export default async function Page({ params }) {
  const handle = (await params).handle;
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  // If the handle is already claimed, you cannot create the linktree
  const item = await collection.findOne({ handle: handle });
  if (!item) {
    return notFound();
  }
  return (
    <div className="flex min-h-screen bg-purple-400 justify-center items-start pt-15 pb-10 px-4">
      {item && (
        <div className="photo flex justify-center flex-col items-center gap-4">
          <img
            src={item.pic}
            alt={item.handle}
            className="h-28 w-28 rounded-full object-cover bg-white/20 ui-img-round"
          />
          <span className="font-bold text-xl">@{item.handle}</span>
          <span className="desc w-80 text-center">{item.desc}</span>

          <div className="flex gap-3">
            <Link
              href="/handle"
              className="bg-gray-900 text-white font-bold px-5 py-2 rounded-full"
            >
              Back
            </Link>
            <Link
              href={`/handle/${encodeURIComponent(item.handle)}/edit`}
              className="bg-pink-300 text-gray-900 font-bold px-5 py-2 rounded-full"
            >
              Edit
            </Link>
          </div>

          <div className="links">
            {item.links.map((item, index) => {
              const href = normalizeHref(item.link);
              const isInternal = href.startsWith("/");

              return (
                <div key={index}>
                  {isInternal ? (
                    <Link href={href} target="_blank" rel="noopener noreferrer">
                      <div className="bg-purple-100 py-4 shadow-lg px-2 min-w-96 flex justify-center rounded-md my-3">
                        {item.linktext}
                      </div>
                    </Link>
                  ) : (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <div className="bg-purple-100 py-4 shadow-lg px-2 min-w-96 flex justify-center rounded-md my-3">
                        {item.linktext}
                      </div>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
