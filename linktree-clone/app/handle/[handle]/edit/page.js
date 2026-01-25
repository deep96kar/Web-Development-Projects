import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import EditClient from "./EditClient";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  const handle = (await params).handle;

  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  const item = await collection.findOne(
    { handle },
    {
      projection: {
        handle: 1,
        links: 1,
        pic: 1,
        desc: 1,
      },
    },
  );

  if (!item) {
    return notFound();
  }

  return <EditClient initial={JSON.parse(JSON.stringify(item))} />;
}
