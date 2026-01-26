import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";

const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Home() {
  return (
    <main className="bg-purple-100">
      <section className="grid grid-cols-2 h-[50vh]">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className={`text-3xl font-bold ${poppins.className}`}>
            BitLinks — Simple, Fast URL Shortener
          </p>
          <p className="px-56 text-center">
            Shorten long links, choose a custom short name, and manage all your
            saved URLs from a single dashboard. Built with Next.js and MongoDB.
            Created by Deep Karmakar.
          </p>
          <div className="flex gap-3 justify-start">
            <Link href="/shorten">
              <button className="bg-purple-500 rounded-lg shadow-lg p-3 py-1 font-bold text-white">
                Try Now
              </button>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-purple-500 rounded-lg shadow-lg p-3 py-1 font-bold text-white">
                GitHub
              </button>
            </a>
          </div>
        </div>
        <div className=" flex justify-start relative">
          <Image
            className="mix-blend-darken"
            alt="an Image of a vector"
            src={"/vector.jpg"}
            fill={true}
          />
        </div>
      </section>
    </main>
  );
}
