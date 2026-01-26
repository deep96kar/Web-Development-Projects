"use client";

export default function ContactForm() {
  return (
    <form className="mt-8 mx-auto grid gap-4 max-w-xl text-center">
      <label className="grid gap-2 text-left">
        <span className="text-sm font-semibold text-purple-900">Name</span>
        <input
          className="px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Your name"
        />
      </label>

      <label className="grid gap-2 text-left">
        <span className="text-sm font-semibold text-purple-900">Email</span>
        <input
          type="email"
          className="px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="you@example.com"
        />
      </label>

      <label className="grid gap-2 text-left">
        <span className="text-sm font-semibold text-purple-900">Message</span>
        <textarea
          rows={5}
          className="px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Write your message..."
        />
      </label>

      <button
        type="button"
        className="mt-2 w-fit mx-auto bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow px-5 py-2"
        onClick={() =>
          alert("Demo form — connect this to an API route if you want!")
        }
      >
        Send
      </button>

      <p className="text-xs text-purple-700 text-center">
        Note: This is a demo contact form (no backend wired yet).
      </p>
    </form>
  );
}
