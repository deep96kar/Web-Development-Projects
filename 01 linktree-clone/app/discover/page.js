import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#254f1a] text-yellow-100">
      <section className="max-w-[1200px] mx-auto pt-45 px-6 lg:px-10">
        <h1 className="text-3xl lg:text-5xl font-bold">Discover</h1>
        <p className="mt-3 text-lg text-yellow-100/80">
          Explore trending creators and pages.
        </p>

        <div className="mt-6 max-w-xl">
          <input
            className="ui-input-dark max-w-none"
            placeholder="Search @handle (demo)"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "@deep", desc: "Developer links" },
            { title: "@artist", desc: "Portfolio + shop" },
            { title: "@creator", desc: "Videos + newsletter" },
            { title: "@startup", desc: "Product + waitlist" },
            { title: "@gym", desc: "Classes + booking" },
            { title: "@photographer", desc: "Work + contact" },
          ].map((x) => (
            <Link
              key={x.title}
              href="/generate"
              className="rounded-2xl border border-yellow-200/20 bg-white/5 p-6 hover:bg-white/10 transition block"
            >
              <div className="text-xl font-bold">{x.title}</div>
              <div className="mt-2 text-yellow-100/80">{x.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
