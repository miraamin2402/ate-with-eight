"use client";

import { motion } from "framer-motion";

const copy =
  "Ate with Eight is a supper club for builders, engineers, and founders in the startup ecosystem. based in NYC, usually on Thursday nights, a 3-course entirely homecooked meal, for 8 people.";

export function About() {
  return (
    <section className="bg-[#F4E9D8] px-5 py-24 sm:px-10 sm:py-32">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body text-lg leading-[1.85] text-[#4a4238] sm:text-xl sm:leading-[2]">
          {copy}
        </p>
      </motion.div>
    </section>
  );
}
