"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function CandleDivider() {
  return (
    <div className="mt-10 mb-4 flex justify-center bg-[#F4E9D8] px-5 sm:mb-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative shrink-0"
      >
        <Image
          src="/candle.png"
          alt=""
          width={180}
          height={220}
          className="h-[135px] w-auto max-h-[150px] object-contain"
          sizes="180px"
          aria-hidden
        />
      </motion.div>
    </div>
  );
}
