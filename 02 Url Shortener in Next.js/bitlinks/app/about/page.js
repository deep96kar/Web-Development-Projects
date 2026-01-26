export const metadata = {
  title: "About - BitLinks",
  description:
    "Learn more about BitLinks, a simple and privacy-friendly URL shortener.",
};

export default function AboutPage() {
  return (
    <main className="bg-purple-50">
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-purple-100">
          <h1 className="text-3xl font-extrabold text-purple-900">
            About BitLinks
          </h1>
          <p className="mt-4 text-purple-800 leading-relaxed">
            BitLinks is a lightweight URL shortener built with Next.js and
            MongoDB. It helps you create clean, memorable short links that
            redirect instantly.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-purple-50 p-5 border border-purple-100">
              <h2 className="font-bold text-purple-900">Fast</h2>
              <p className="mt-2 text-sm text-purple-800">
                Simple redirects with minimal overhead.
              </p>
            </div>
            <div className="rounded-xl bg-purple-50 p-5 border border-purple-100">
              <h2 className="font-bold text-purple-900">Straightforward</h2>
              <p className="mt-2 text-sm text-purple-800">
                No complex dashboards—just create and share.
              </p>
            </div>
            <div className="rounded-xl bg-purple-50 p-5 border border-purple-100">
              <h2 className="font-bold text-purple-900">Privacy-friendly</h2>
              <p className="mt-2 text-sm text-purple-800">
                Focused on shortening links, not tracking users.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-purple-900">
              What’s inside this project
            </h2>
            <p className="text-purple-800 mt-2 leading-relaxed">
              BitLinks is a Next.js URL shortener with MongoDB storage.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-purple-50 p-5 border border-purple-100">
                <h3 className="font-bold text-purple-900">Shorten URLs</h3>
                <p className="mt-2 text-sm text-purple-800">
                  Create a custom short name and generate a shareable short
                  link.
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-5 border border-purple-100">
                <h3 className="font-bold text-purple-900">Redirect system</h3>
                <p className="mt-2 text-sm text-purple-800">
                  Visiting{" "}
                  <span className="font-semibold">/&lt;shorturl&gt;</span>{" "}
                  redirects to the original URL.
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-5 border border-purple-100">
                <h3 className="font-bold text-purple-900">URLs dashboard</h3>
                <p className="mt-2 text-sm text-purple-800">
                  View all saved links, open them in a new tab, copy, and edit.
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-5 border border-purple-100">
                <h3 className="font-bold text-purple-900">
                  Validation + safety
                </h3>
                <p className="mt-2 text-sm text-purple-800">
                  Short names are validated and kept unique; URLs are normalized
                  to http/https.
                </p>
              </div>
            </div>
            <div className="mt-8 rounded-xl bg-purple-700 p-6 text-white">
              <h3 className="text-lg font-bold">How it works</h3>
              <ol className="mt-2 list-decimal list-inside text-sm text-purple-100 space-y-1">
                <li>Pick a URL and a short code.</li>
                <li>BitLinks saves it in MongoDB.</li>
                <li>Visiting the short code redirects to your original URL.</li>
              </ol>
            </div>

            <p className="mt-6 text-sm text-purple-800">
              Built by <span className="font-bold">Deep Karmakar</span>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
