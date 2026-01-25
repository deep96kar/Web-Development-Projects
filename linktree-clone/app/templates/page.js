import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#254f1a] text-yellow-100">
      <section className="max-w-[1200px] mx-auto pt-45 px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold">Templates</h1>
            <p className="mt-3 text-lg text-yellow-100/80">
              Pick a style and launch your BitTree in minutes.
            </p>
          </div>
          <Link className="ui-btn-accent w-fit" href="/generate">
            Create your BitTree
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Minimal",
              desc: "Clean layout focused on links.",
            },
            {
              title: "Creator",
              desc: "Perfect for YouTube/Instagram creators.",
            },
            {
              title: "Business",
              desc: "Add CTAs, portfolio links and contact.",
            },
          ].map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-yellow-200/20 bg-white/5 p-6"
            >
              <h2 className="text-xl font-bold">{t.title}</h2>
              <p className="mt-2 text-yellow-100/80">{t.desc}</p>
              <div className="mt-5">
                <Link className="ui-btn-primary" href="/generate">
                  Use template
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
