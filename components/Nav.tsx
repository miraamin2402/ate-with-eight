"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "home" },
  { href: "/the-why", label: "the why" },
  { href: "/the-archives", label: "the archives" },
  { href: "/contact", label: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHome = pathname === "/";
  const transparent = onHome && !scrolled;

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-[200] transition-colors duration-300"
      initial={false}
      animate={{
        backgroundColor: transparent ? "rgba(244, 233, 216, 0)" : "#F4E9D8",
        boxShadow: transparent
          ? "0 0 0 rgba(0,0,0,0)"
          : "0 1px 0 rgba(120, 92, 68, 0.35), 0 8px 24px rgba(62, 44, 30, 0.07)",
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-heading text-[20px] font-normal italic leading-tight tracking-tight text-[#1B2A6B]"
        >
          8w8
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm sm:gap-x-8 sm:text-base">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-body border-b border-transparent pb-0.5 transition-colors hover:border-[#C1440E] hover:text-[#C1440E] ${
                  pathname === href
                    ? "border-[#C1440E] text-[#C1440E]"
                    : "text-[#3d3429]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
