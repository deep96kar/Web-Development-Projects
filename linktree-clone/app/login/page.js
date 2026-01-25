import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#254f1a] text-yellow-100">
      <section className="max-w-[1200px] mx-auto pt-45 px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold">Log in</h1>
            <p className="mt-3 text-lg text-yellow-100/80">
              Welcome back. This is a demo UI.
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-200/20 bg-white/5 p-6">
            <div className="space-y-4">
              <input
                className="ui-input-dark max-w-none"
                placeholder="Email"
                type="email"
              />
              <input
                className="ui-input-dark max-w-none"
                placeholder="Password"
                type="password"
              />
              <button className="ui-btn-accent w-full">Log in</button>
              <div className="flex items-center justify-between text-yellow-100/80">
                <Link href="/signup" className="underline">
                  Create account
                </Link>
                <Link href="/" className="underline">
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
