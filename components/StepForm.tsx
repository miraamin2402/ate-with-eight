"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  type KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

const TOTAL = 6;

type FormState = {
  name: string;
  email: string;
  what_do_you_do: string;
  interest: string;
  how_did_you_hear: string;
  link: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  what_do_you_do: "",
  interest: "",
  how_did_you_hear: "",
  link: "",
};

const inputClass =
  "w-full rounded-lg border border-[#d4c9b8] bg-[#FAF3E8] px-3 py-2.5 text-sm text-[#2c2419] shadow-none outline-none transition-[box-shadow] placeholder:text-[#8a8578]/80 focus:ring-2 focus:ring-[#1B2A6B]/20";

function isStepValid(step: number, form: FormState): boolean {
  switch (step) {
    case 0:
      return form.name.trim().length > 0;
    case 1:
      return (
        form.email.trim().length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
      );
    case 2:
      return form.what_do_you_do.trim().length > 0;
    case 3:
      return ["attending", "co-hosting", "both"].includes(form.interest);
    case 4:
      return form.how_did_you_hear.trim().length > 0;
    case 5:
      return form.link.trim().length > 0;
    default:
      return false;
  }
}

function isFullFormValid(form: FormState): boolean {
  for (let i = 0; i < TOTAL; i++) {
    if (!isStepValid(i, form)) return false;
  }
  return true;
}

type StepFormProps = {
  /** Renders the home-page CTA heading (green, centered) above the form */
  sectionTitle?: string;
  className?: string;
};

export function StepForm({ sectionTitle, className }: StepFormProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const canAdvance = useMemo(
    () => isStepValid(step, form) && step < TOTAL - 1,
    [step, form],
  );

  const canSubmit = useMemo(() => isFullFormValid(form), [form]);

  const goNext = useCallback(() => {
    if (!isStepValid(step, form)) return;
    setStep((s) => Math.min(s + 1, TOTAL - 1));
  }, [step, form]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (step < TOTAL - 1) goNext();
  };

  async function handleSubmit() {
    if (!isFullFormValid(form)) return;
    setStatus("idle");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          what_do_you_do: form.what_do_you_do.trim(),
          interest: form.interest,
          how_did_you_hear: form.how_did_you_hear.trim(),
          link: form.link.trim(),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(
          typeof data.error === "string" ? data.error : "Something went wrong.",
        );
        return;
      }
      setStatus("success");
      setForm(emptyForm);
      setStep(0);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  const progressPct = ((step + 1) / TOTAL) * 100;

  const innerForm = (
    <div
      className={`flex max-h-[300px] min-h-[260px] flex-col overflow-hidden ${sectionTitle ? "mt-6" : ""} ${className ?? ""}`}
    >
      {status === "success" ? (
        <p className="font-body text-center text-base leading-relaxed text-[#2c2419]">
          thanks for reaching out! we&apos;ll be in touch soon.
        </p>
      ) : (
        <>
          <div className="mb-4 shrink-0 space-y-2">
            <p className="text-center text-xs text-[#4a4238]">
              {step + 1} of {TOTAL}
            </p>
            <div className="h-1 w-full overflow-hidden rounded-full bg-[#d4c9b8]">
              <motion.div
                className="h-full rounded-full bg-[#C1440E]"
                initial={false}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="relative min-h-0 flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="flex min-h-full flex-col justify-center pb-2"
              >
                {step === 0 ? (
                  <>
                    <label
                      htmlFor="sf-name"
                      className="font-heading mb-3 block text-xl font-normal leading-snug text-[#1B2A6B] sm:text-2xl"
                    >
                      what&apos;s your name?
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="sf-name"
                        autoFocus
                        className={inputClass}
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        onKeyDown={onKeyDown}
                      />
                      <button
                        type="button"
                        aria-label="Next"
                        disabled={!canAdvance}
                        onClick={goNext}
                        className="shrink-0 rounded-lg bg-[#C1440E] px-3 py-2.5 text-lg font-medium leading-none text-[#FAF3E8] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        →
                      </button>
                    </div>
                  </>
                ) : null}

                {step === 1 ? (
                  <>
                    <label
                      htmlFor="sf-email"
                      className="font-heading mb-3 block text-xl font-normal leading-snug text-[#1B2A6B] sm:text-2xl"
                    >
                      what&apos;s your email?
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="sf-email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        className={inputClass}
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        onKeyDown={onKeyDown}
                      />
                      <button
                        type="button"
                        aria-label="Next"
                        disabled={!canAdvance}
                        onClick={goNext}
                        className="shrink-0 rounded-lg bg-[#C1440E] px-3 py-2.5 text-lg font-medium leading-none text-[#FAF3E8] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        →
                      </button>
                    </div>
                  </>
                ) : null}

                {step === 2 ? (
                  <>
                    <label
                      htmlFor="sf-what"
                      className="font-heading mb-3 block text-xl font-normal leading-snug text-[#1B2A6B] sm:text-2xl"
                    >
                      what do you do?
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="sf-what"
                        autoFocus
                        className={inputClass}
                        value={form.what_do_you_do}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            what_do_you_do: e.target.value,
                          }))
                        }
                        onKeyDown={onKeyDown}
                      />
                      <button
                        type="button"
                        aria-label="Next"
                        disabled={!canAdvance}
                        onClick={goNext}
                        className="shrink-0 rounded-lg bg-[#C1440E] px-3 py-2.5 text-lg font-medium leading-none text-[#FAF3E8] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        →
                      </button>
                    </div>
                  </>
                ) : null}

                {step === 3 ? (
                  <>
                    <p className="font-heading mb-3 text-xl font-normal leading-snug text-[#1B2A6B] sm:text-2xl">
                      interested in attending or co-hosting?
                    </p>
                    <div className="flex flex-col gap-2">
                      {(
                        [
                          ["attending", "attending"],
                          ["co-hosting", "co-hosting"],
                          ["both", "both"],
                        ] as const
                      ).map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          className="w-full rounded-lg border border-[#d4c9b8] bg-[#FAF3E8] py-2.5 text-sm font-medium text-[#1B2A6B] transition-colors hover:bg-[#ede6d8]"
                          onClick={() => {
                            setForm((f) => ({ ...f, interest: value }));
                            setStep(4);
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}

                {step === 4 ? (
                  <>
                    <label
                      htmlFor="sf-hear"
                      className="font-heading mb-3 block text-xl font-normal leading-snug text-[#1B2A6B] sm:text-2xl"
                    >
                      how did you hear about 8w8?
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="sf-hear"
                        autoFocus
                        className={inputClass}
                        value={form.how_did_you_hear}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            how_did_you_hear: e.target.value,
                          }))
                        }
                        onKeyDown={onKeyDown}
                      />
                      <button
                        type="button"
                        aria-label="Next"
                        disabled={!canAdvance}
                        onClick={goNext}
                        className="shrink-0 rounded-lg bg-[#C1440E] px-3 py-2.5 text-lg font-medium leading-none text-[#FAF3E8] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        →
                      </button>
                    </div>
                  </>
                ) : null}

                {step === 5 ? (
                  <>
                    <label
                      htmlFor="sf-link"
                      className="font-heading mb-3 block text-xl font-normal leading-snug text-[#1B2A6B] sm:text-2xl"
                    >
                      link to your linkedin, x, personal website, etc.
                    </label>
                    <input
                      id="sf-link"
                      autoFocus
                      className={`${inputClass} mb-3`}
                      value={form.link}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, link: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (canSubmit) void handleSubmit();
                        }
                      }}
                      placeholder="https://"
                    />
                    <button
                      type="button"
                      disabled={!canSubmit}
                      onClick={() => void handleSubmit()}
                      className="w-full rounded-lg bg-[#C1440E] px-4 py-3 text-center font-medium text-[#FAF3E8] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35 sm:w-auto"
                    >
                      submit
                    </button>
                  </>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          {status === "error" ? (
            <p className="mt-3 shrink-0 text-sm text-[#a3360b]" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </>
      )}
    </div>
  );

  if (sectionTitle) {
    return (
      <section className="bg-[#F4E9D8] px-5 sm:px-8 pt-[60px] pb-[40px]">
        <div className="mx-auto w-full max-w-6xl">
          <motion.h2
            className="font-heading mb-5 text-center text-3xl font-normal lowercase leading-snug tracking-tight text-[#556b32] sm:mb-6 sm:text-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            {sectionTitle}
          </motion.h2>
          <div className="mx-auto max-w-xl">{innerForm}</div>
        </div>
      </section>
    );
  }

  return innerForm;
}
