import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-16 bg-purple-700 flex justify-between px-3 items-center text-white ">
      <div className="logo font-bold text-2xl">
        <Link href="/">BitLinks</Link>
      </div>
      <ul className="flex justify-center gap-4 items-center">
        <Link href="/">
          <li className="cursor-pointer">Home</li>
        </Link>
        <Link href="/about">
          <li className="cursor-pointer">About</li>
        </Link>
        <Link href="/shorten">
          <li className="cursor-pointer">Shorten</li>
        </Link>
        <Link href="/urls">
          <li className="cursor-pointer">URLs</li>
        </Link>
        <Link href="/contact">
          <li className="cursor-pointer">Contact Us</li>
        </Link>
        <li className="flex gap-3">
          <Link href="/shorten">
            <button className="bg-purple-500 rounded-lg shadow-lg p-3 py-1 font-bold">
              Try Now
            </button>
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-purple-500 rounded-lg shadow-lg p-3 py-1 font-bold">
              GitHub
            </button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
