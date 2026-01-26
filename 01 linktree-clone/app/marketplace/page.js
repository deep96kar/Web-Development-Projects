import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#254f1a] text-yellow-100">
      <section className="max-w-[1200px] mx-auto pt-45 px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold">Marketplace</h1>
            <p className="mt-3 text-lg text-yellow-100/80">
              Add tools, embeds, and integrations to your LinkTree.
            </p>
          </div>
          <Link className="ui-btn-accent w-fit" href="/generate">
            Build your page
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "YouTube", desc: "Embed your latest video." },
            { title: "Instagram", desc: "Link your reels & profile." },
            { title: "Store", desc: "Sell products with one link." },
            { title: "Newsletter", desc: "Collect email subscribers." },
            { title: "Payments", desc: "Accept tips and payments." },
            { title: "Analytics", desc: "Track clicks and visits." },
          ].map((x) => (
            <div
              key={x.title}
              className="rounded-2xl border border-yellow-200/20 bg-white/5 p-6"
            >
              <h2 className="text-xl font-bold">{x.title}</h2>
              <p className="mt-2 text-yellow-100/80">{x.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
