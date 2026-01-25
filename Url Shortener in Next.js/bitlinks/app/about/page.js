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

          <div className="mt-8 rounded-xl bg-purple-700 p-6 text-white">
            <h3 className="text-lg font-bold">How it works</h3>
            <ol className="mt-2 list-decimal list-inside text-sm text-purple-100 space-y-1">
              <li>Pick a URL and a short code.</li>
              <li>BitLinks saves it in MongoDB.</li>
              <li>Visiting the short code redirects to your original URL.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
