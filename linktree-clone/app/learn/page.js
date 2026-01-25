import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#254f1a] text-yellow-100">
      <section className="max-w-[1200px] mx-auto pt-45 px-6 lg:px-10">
        <h1 className="text-3xl lg:text-5xl font-bold">Learn</h1>
        <p className="mt-3 text-lg text-yellow-100/80">
          Quick guides to build a better link-in-bio page.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Pick a great handle",
              desc: "Short, memorable, easy to type.",
            },
            {
              title: "Write a strong bio",
              desc: "One sentence: who you are + what you do.",
            },
            {
              title: "Order links by priority",
              desc: "Top link = your main goal.",
            },
            {
              title: "Use consistent branding",
              desc: "Same color, same profile image everywhere.",
            },
            {
              title: "Track what works",
              desc: "Check clicks and update weekly.",
            },
            {
              title: "Add one CTA",
              desc: "Newsletter, shop, booking—keep it simple.",
            },
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

        <div className="mt-10">
          <Link className="ui-btn-accent" href="/generate">
            Try it now
          </Link>
        </div>
      </section>
    </main>
  );
}
