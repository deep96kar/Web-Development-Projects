export const metadata = {
  title: "Contact - BitLinks",
  description: "Contact BitLinks for feedback, suggestions, or support.",
};

import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="bg-purple-50">
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-purple-100 text-center">
          <h1 className="text-3xl font-extrabold text-purple-900">Contact</h1>
          <p className="mt-4 text-purple-800">
            Have feedback or a feature request? Send a message.
          </p>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
