"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");

  const createTree = () => {
    router.push(`/generate?handle=${text}`);
  };
  return (
    <main>
      <section className="bg-[#254f1a] h-screen overflow-hidden box-border pt-36 grid grid-cols-2">
        <div className="flex justify-center flex-col ml-[10vw] gap-3">
          <p className="text-yellow-300 font-bold text-4xl lg:text-6xl">
            Everything you{" "}
          </p>
          <p className="text-yellow-300 font-bold text-4xl lg:text-6xl">
            are. In one,
          </p>
          <p className="text-yellow-300 font-bold text-4xl lg:text-6xl">
            simple link in bio.
          </p>
          <p className="text-yellow-300 text-lg my-3">
            Join 50M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
          <div className="input flex gap-2 items-center">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="ui-input-dark"
              type="text"
              placeholder="Enter your Handle"
            />
            <button onClick={() => createTree()} className="ui-btn-accent">
              Claim your linktree
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col mr-[10vw]">
          <img
            className="max-h-[70vh] object-contain"
            src="/home.png"
            alt="homepage image"
          />
        </div>
      </section>
    </main>
  );
}
