"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const TYPEFORM_SRC =
  "https://form.typeform.com/to/rXk44hvG?typeform-medium=embed-snippet&hide-headers=true&hide-footer=true";
/** Widget height in px */
const EMBED_HEIGHT = 420;

export type JoinTypeformSectionProps = {
  title?: string;
  /** Renders below the embed (e.g. email copy on /contact) */
  afterForm?: ReactNode;
  /** Tighter vertical padding when the page `main` already clears the fixed nav */
  compactSpacing?: boolean;
};

export function JoinTypeformSection({
  title = "come join us for a bite",
  afterForm,
  compactSpacing = false,
}: JoinTypeformSectionProps = {}) {
  const sectionPad = compactSpacing
    ? "pt-4 pb-16 sm:pb-24"
    : "pt-[60px] pb-[40px]";

  return (
    <section className={`bg-[#F4E9D8] px-5 sm:px-8 ${sectionPad}`}>
      <div className="mx-auto w-full max-w-6xl">
        <motion.h2
          className="font-heading mb-5 text-center text-3xl font-normal lowercase leading-snug tracking-tight text-[#556b32] sm:mb-6 sm:text-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          {title}
        </motion.h2>
        <iframe
          title="Join us — Typeform"
          src={TYPEFORM_SRC}
          width="100%"
          height={EMBED_HEIGHT}
          className="block w-full border-0"
          style={{ border: "none", height: EMBED_HEIGHT }}
          frameBorder={0}
          allow="microphone; camera; geolocation; fullscreen"
          allowFullScreen
        />
        {afterForm ? <div className="mt-8">{afterForm}</div> : null}
      </div>
    </section>
  );
}
