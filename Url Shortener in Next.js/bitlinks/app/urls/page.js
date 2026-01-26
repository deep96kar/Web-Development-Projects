"use client";

import { useEffect, useMemo, useState } from "react";

export default function UrlsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editUrl, setEditUrl] = useState("");
  const [editShorturl, setEditShorturl] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const origin = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.origin;
  }, []);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/urls", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to load URLs");
      }
      setItems(Array.isArray(data?.items) ? data.items : []);
    } catch (e) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditUrl(item.url || "");
    setEditShorturl(item.shorturl || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditUrl("");
    setEditShorturl("");
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/urls/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: editUrl, shorturl: editShorturl }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Update failed");
      }
      cancelEdit();
      await load();
      alert("Updated successfully");
    } catch (e) {
      alert(e?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const permanentlyDelete = async () => {
    if (!editingId) return;
    const ok = confirm("Permanently delete this link?");
    if (!ok) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/urls/${editingId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Delete failed");
      }
      cancelEdit();
      await load();
      alert("Deleted permanently");
    } catch (e) {
      alert(e?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-purple-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-purple-900">Your URLs</h1>
            <p className="text-purple-700 mt-1">
              All your saved short links will appear here.
            </p>
          </div>
          <button
            onClick={load}
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow px-5 py-2"
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="mt-6 rounded-lg border border-purple-200 bg-white p-6 text-purple-800">
            No links found. Create one from the Shorten page.
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => {
            const shortLink = origin
              ? `${origin}/${item.shorturl}`
              : `/${item.shorturl}`;
            const isEditing = editingId === item._id;

            return (
              <div
                key={item._id}
                className="rounded-xl border border-purple-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-purple-500 font-semibold">
                      Short name
                    </p>
                    <a
                      href={shortLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-purple-900 break-all underline hover:text-purple-950"
                      title="Open short link in new tab"
                    >
                      {item.shorturl}
                    </a>
                  </div>

                  {!isEditing ? (
                    <button
                      onClick={() => startEdit(item)}
                      className="shrink-0 bg-purple-100 hover:bg-purple-200 text-purple-900 font-semibold rounded-lg px-4 py-2"
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      onClick={cancelEdit}
                      className="shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg px-4 py-2"
                      disabled={saving || deleting}
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wide text-purple-500 font-semibold">
                    Destination URL
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-900 break-all underline hover:text-purple-950"
                    title="Open destination in new tab"
                  >
                    {item.url}
                  </a>
                </div>

                <div className="mt-3 flex gap-3 flex-wrap">
                  <a
                    href={shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-900 font-semibold underline"
                  >
                    Open short link
                  </a>
                  <button
                    className="text-purple-700 hover:text-purple-900 font-semibold underline"
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(shortLink);
                        alert("Copied!");
                      } catch {
                        alert("Copy failed");
                      }
                    }}
                  >
                    Copy
                  </button>
                </div>

                {isEditing && (
                  <div className="mt-5 grid gap-3">
                    <label className="grid gap-1">
                      <span className="text-sm font-semibold text-purple-900">
                        Short name
                      </span>
                      <input
                        value={editShorturl}
                        onChange={(e) => setEditShorturl(e.target.value)}
                        className="px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="new-short-name"
                      />
                    </label>

                    <label className="grid gap-1">
                      <span className="text-sm font-semibold text-purple-900">
                        Destination URL
                      </span>
                      <input
                        value={editUrl}
                        onChange={(e) => setEditUrl(e.target.value)}
                        className="px-4 py-2 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://example.com"
                      />
                    </label>

                    <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={saveEdit}
                        className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow px-5 py-2"
                        disabled={saving || deleting}
                        type="button"
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>

                      <button
                        onClick={permanentlyDelete}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow px-5 py-2"
                        disabled={saving || deleting}
                        type="button"
                      >
                        {deleting ? "Deleting..." : "Permanently Delete"}
                      </button>
                    </div>

                    <p className="text-xs text-purple-700">
                      Tip: short name only supports letters, numbers, <b>-</b>{" "}
                      and <b>_</b>.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
