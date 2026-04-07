"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FormEvent, useState } from "react";

const FORMSPREE_URL = "https://formspree.io/f/PLACEHOLDER";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const data = new FormData(form);
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.p
            key="done"
            className="font-heading text-center text-2xl leading-relaxed text-[#2c2419] sm:text-3xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            You&apos;re on the list. See you at the table.
          </motion.p>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-heading text-3xl tracking-tight lowercase text-[#2c2419] sm:text-4xl">
              join the table.
            </h1>

            <form onSubmit={onSubmit} className="font-body mt-12 space-y-10">
              <label className="block">
                <span className="mb-3 block text-sm uppercase tracking-wider text-[#6B7C3A]">
                  Name
                </span>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full border-0 border-b border-[#c9b8a0] bg-transparent py-2 text-lg text-[#2c2419] outline-none ring-0 transition-colors placeholder:text-[#9a8f82] focus:border-[#C1440E]"
                  placeholder="Your name"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-sm uppercase tracking-wider text-[#6B7C3A]">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full border-0 border-b border-[#c9b8a0] bg-transparent py-2 text-lg text-[#2c2419] outline-none ring-0 transition-colors placeholder:text-[#9a8f82] focus:border-[#C1440E]"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-sm uppercase tracking-wider text-[#6B7C3A]">
                  What you do or build
                </span>
                <textarea
                  name="what_you_build"
                  required
                  rows={3}
                  className="w-full resize-y border-0 border-b border-[#c9b8a0] bg-transparent py-2 text-lg text-[#2c2419] outline-none ring-0 transition-colors placeholder:text-[#9a8f82] focus:border-[#C1440E]"
                  placeholder="A sentence or two is plenty."
                />
              </label>

              <fieldset className="space-y-5">
                <legend className="mb-4 text-sm uppercase tracking-wider text-[#6B7C3A]">
                  I&apos;m interested in
                </legend>
                <label className="flex cursor-pointer items-start gap-3 text-lg text-[#3d3429]">
                  <input
                    type="radio"
                    name="intent"
                    value="attend"
                    required
                    className="mt-1.5 size-4 shrink-0 accent-[#C1440E]"
                  />
                  <span>I&apos;d like to attend a dinner</span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 text-lg text-[#3d3429]">
                  <input
                    type="radio"
                    name="intent"
                    value="cohost"
                    className="mt-1.5 size-4 shrink-0 accent-[#C1440E]"
                  />
                  <span>I&apos;d like to co-host a dinner</span>
                </label>
              </fieldset>

              {status === "error" && (
                <p className="text-sm text-[#C1440E]">
                  Something went wrong. Please try again in a moment.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-full bg-[#F4E9D8] px-8 py-3.5 text-base font-medium text-[#2c2419] transition-colors hover:bg-[#F4E9D8] disabled:cursor-wait disabled:opacity-70"
              >
                {status === "submitting" ? "Sending…" : "Put me on the list"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
