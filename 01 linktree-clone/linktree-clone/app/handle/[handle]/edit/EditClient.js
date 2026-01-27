"use client";

import React, { useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const EditClient = ({ initial }) => {
  const router = useRouter();

  const handle = initial?.handle || "";

  const initialLinks = useMemo(() => {
    const links = Array.isArray(initial?.links) ? initial.links : [];
    return links.length ? links : [{ link: "", linktext: "" }];
  }, [initial]);

  const [links, setLinks] = useState(initialLinks);
  const [pic, setPic] = useState(initial?.pic || "");
  const [desc, setDesc] = useState(initial?.desc || "");
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleChange = (index, nextLink, nextText) => {
    setLinks((prev) =>
      prev.map((item, i) =>
        i === index ? { link: nextLink, linktext: nextText } : item,
      ),
    );
  };

  const addLink = () => {
    setLinks((prev) => prev.concat([{ link: "", linktext: "" }]));
  };

  const removeLink = (index) => {
    setLinks((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.length ? next : [{ link: "", linktext: "" }];
    });
  };

  const submitUpdate = async () => {
    setSaving(true);
    try {
      const r = await fetch("/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle,
          links,
          pic,
          desc,
        }),
      });

      const result = await r.json();

      if (result?.success) {
        toast.success(result.message || "Updated");
        setTimeout(() => {
          router.push(`/${encodeURIComponent(handle)}`);
        }, 600);
      } else {
        toast.error(result?.message || "Update failed");
      }
    } catch (e) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const submitDelete = async () => {
    if (deleteConfirm !== handle) {
      toast.error("Type the handle to confirm delete");
      return;
    }

    const ok = window.confirm(
      `This will permanently delete @${handle}. This cannot be undone. Continue?`,
    );
    if (!ok) return;

    setDeleting(true);
    try {
      const r = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle }),
      });
      const result = await r.json();

      if (result?.success) {
        toast.success(result?.message || "Deleted");
        setTimeout(() => {
          router.push("/handle");
        }, 600);
      } else {
        toast.error(result?.message || "Delete failed");
      }
    } catch (e) {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-[#E9C0E9] min-h-screen">
      <div className="max-w-300 mx-auto pt-36 px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="text-gray-900">
            <h1 className="font-bold text-3xl lg:text-4xl">Edit linktree</h1>
            <p className="mt-2 text-gray-700">
              Editing: <span className="font-semibold">@{handle}</span>
            </p>

            <div className="mt-6 space-y-6">
              <div className="item">
                <h2 className="font-semibold text-xl">Links</h2>
                <div className="mt-2 space-y-3">
                  {links.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-5 gap-3"
                    >
                      <input
                        value={item.linktext || ""}
                        onChange={(e) =>
                          handleChange(index, item.link, e.target.value)
                        }
                        className="ui-input max-w-none md:col-span-2"
                        type="text"
                        placeholder="Enter link text"
                      />
                      <input
                        value={item.link || ""}
                        onChange={(e) =>
                          handleChange(index, e.target.value, item.linktext)
                        }
                        className="ui-input max-w-none md:col-span-2"
                        type="text"
                        placeholder="Enter link"
                      />
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="ui-btn-primary md:col-span-1 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addLink}
                  className="mt-3 ui-btn-primary font-bold cursor-pointer"
                >
                  + Add Link
                </button>
              </div>

              <div className="item">
                <h2 className="font-semibold text-xl">
                  Picture and Description
                </h2>
                <div className="mt-2 space-y-3">
                  <input
                    value={pic}
                    onChange={(e) => setPic(e.target.value)}
                    className="ui-input"
                    type="text"
                    placeholder="Enter link to your Picture"
                  />
                  <input
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="ui-input"
                    type="text"
                    placeholder="Enter description"
                  />

                  <div className="flex gap-3">
                    <button
                      disabled={saving}
                      onClick={submitUpdate}
                      className="ui-btn-primary font-bold disabled:bg-slate-500 cursor-pointer"
                    >
                      {saving ? "Saving..." : "Save changes"}
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push("/handle")}
                      className="ui-btn-accent font-bold cursor-pointer"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>

              <div className="item">
                <h2 className="font-semibold text-xl text-red-900">
                  Danger Zone
                </h2>
                <p className="mt-1 text-sm text-gray-800">
                  Permanent delete: this will remove the handle and all links.
                </p>

                <div className="mt-3 space-y-3">
                  <input
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                    className="ui-input"
                    type="text"
                    placeholder={`Type ${handle} to confirm`}
                  />

                  <button
                    type="button"
                    disabled={deleting || deleteConfirm !== handle}
                    onClick={submitDelete}
                    className="ui-btn-primary font-bold disabled:bg-slate-500 cursor-pointer bg-red-700 hover:bg-red-800"
                  >
                    {deleting ? "Deleting..." : "Delete permanently"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <img
              className="max-h-[70vh] w-auto object-contain"
              src={pic || "/generate.png"}
              alt="Preview"
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditClient;
