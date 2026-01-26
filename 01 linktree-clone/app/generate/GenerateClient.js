"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

const GenerateClient = () => {
  const searchParams = useSearchParams();

  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, sethandle] = useState(searchParams.get("handle"));
  const [pic, setpic] = useState("");
  const [desc, setdesc] = useState("");

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i == index) {
          return { link, linktext };
        } else {
          return item;
        }
      });
    });
  };

  const addLink = () => {
    setLinks(links.concat([{ link: "", linktext: "" }]));
  };

  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      links: links,
      handle: handle,
      pic: pic,
      desc: desc,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const r = await fetch("/api/add", requestOptions);
    const result = await r.json();
    if (result.success) {
      toast.success(result.message);
      setLinks([]);
      setpic("");
      sethandle("");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="bg-[#E9C0E9] min-h-screen">
      <div className="ui-page-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="text-gray-900">
            <h1 className="font-bold text-3xl lg:text-4xl">
              Create your linktree
            </h1>

            <div className="mt-6 space-y-6">
              <div className="item">
                <h2 className="font-semibold text-xl">
                  Step 1: Claim your Handle
                </h2>
                <div className="mt-2">
                  <input
                    value={handle || ""}
                    onChange={(e) => {
                      sethandle(e.target.value);
                    }}
                    className="ui-input"
                    type="text"
                    placeholder="Choose a Handle"
                  />
                </div>
              </div>

              <div className="item">
                <h2 className="font-semibold text-xl">Step 2: Add Links</h2>
                <div className="mt-2 space-y-3">
                  {links &&
                    links.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-2 gap-3"
                        >
                          <input
                            value={item.linktext || ""}
                            onChange={(e) => {
                              handleChange(index, item.link, e.target.value);
                            }}
                            className="ui-input max-w-none"
                            type="text"
                            placeholder="Enter link text"
                          />
                          <input
                            value={item.link || ""}
                            onChange={(e) => {
                              handleChange(
                                index,
                                e.target.value,
                                item.linktext,
                              );
                            }}
                            className="ui-input max-w-none"
                            type="text"
                            placeholder="Enter link"
                          />
                        </div>
                      );
                    })}
                </div>

                <button
                  onClick={() => addLink()}
                  className="mt-3 ui-btn-primary font-bold"
                >
                  + Add Link
                </button>
              </div>

              <div className="item">
                <h2 className="font-semibold text-xl">
                  Step 3: Add Picture and Description
                </h2>
                <div className="mt-2 space-y-3">
                  <input
                    value={pic || ""}
                    onChange={(e) => {
                      setpic(e.target.value);
                    }}
                    className="ui-input"
                    type="text"
                    placeholder="Enter link to your Picture"
                  />
                  <input
                    value={desc || ""}
                    onChange={(e) => {
                      setdesc(e.target.value);
                    }}
                    className="ui-input"
                    type="text"
                    placeholder="Enter description"
                  />

                  <button
                    disabled={
                      pic == "" || handle == "" || links[0].linktext == ""
                    }
                    onClick={() => {
                      submitLinks();
                    }}
                    className="ui-btn-primary font-bold disabled:bg-slate-500"
                  >
                    Create your linktree
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <img
              className="max-h-[70vh] w-auto object-contain ui-img-round"
              src="/generate.png"
              alt="Generate your links"
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default GenerateClient;
