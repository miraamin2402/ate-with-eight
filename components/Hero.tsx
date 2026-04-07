"use client";

import { motion } from "framer-motion";

/** Must match the exact filename in /public (case-sensitive). */
const HERO_SRC = "/hero-table.png";

export function Hero() {
  return (
    <div className="relative w-full bg-[#F4E9D8]">
      <motion.h1
        className="font-heading pl-10 pt-[120px] text-[48px] font-normal italic lowercase leading-none text-[#1B2A6B]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        ate with eight
      </motion.h1>
      <motion.p
        className="font-body mt-2 pl-10 text-[14px] lowercase leading-tight whitespace-nowrap text-[#2C2C2A]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        a supper club for builders, founders & engineers
      </motion.p>
      <motion.div
        className="relative mt-6 w-full"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      >
        <img
          src={HERO_SRC}
          alt="Hand-drawn dinner table feast illustration"
          className="h-auto w-full object-contain"
        />
      </motion.div>
    </div>
  );
}
