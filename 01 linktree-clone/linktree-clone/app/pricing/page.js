import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#254f1a] text-yellow-100">
      <section className="max-w-[1200px] mx-auto pt-45 px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold">Pricing</h1>
            <p className="mt-3 text-lg text-yellow-100/80">
              Simple plans. Upgrade anytime.
            </p>
          </div>
          <Link className="ui-btn-accent w-fit" href="/generate">
            Start free
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              name: "Free",
              price: "₹0",
              perks: ["Unlimited links", "Basic theme", "Share your handle"],
            },
            {
              name: "Pro",
              price: "₹199/mo",
              perks: ["Custom themes", "Better analytics", "Priority support"],
              highlight: true,
            },
            {
              name: "Business",
              price: "₹499/mo",
              perks: ["Team access", "Advanced analytics", "Custom branding"],
            },
          ].map((p) => (
            <div
              key={p.name}
              className={
                "rounded-2xl border p-6 bg-white/5 " +
                (p.highlight
                  ? "border-pink-300/60 bg-white/10"
                  : "border-yellow-200/20")
              }
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-bold">{p.name}</h2>
                <div className="text-2xl font-bold text-yellow-200">
                  {p.price}
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-yellow-100/80">
                {p.perks.map((perk) => (
                  <li key={perk}>• {perk}</li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  className={p.highlight ? "ui-btn-accent" : "ui-btn-primary"}
                  href="/generate"
                >
                  Choose {p.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
