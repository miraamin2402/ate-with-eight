"use client";

import { motion } from "framer-motion";

const copy =
  "ate with eight is for anyone in the startup ecosystem. based in nyc, I host an intimate dinner in my 500 sq ft apartment, often alongside a co-host. typically on thursdays, we serve a fully home-cooked, three-course meal for 8 guests.";

export function AboutSection() {
  return (
    <section className="bg-[#F4E9D8] py-20">
      <motion.div
        className="mx-auto max-w-[700px] px-5 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body text-[18px] leading-[1.8] text-[#2C2C2A]">
          {copy}
        </p>
      </motion.div>
    </section>
  );
}
