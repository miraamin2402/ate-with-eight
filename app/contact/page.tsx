"use client";

import { type FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  what_do_you_do: string;
  interest: string;
  how_did_you_hear: string;
  link: string;
};

type FieldKey = keyof FormState;

const emptyForm: FormState = {
  name: "",
  email: "",
  what_do_you_do: "",
  interest: "",
  how_did_you_hear: "",
  link: "",
};

const inputClass =
  "w-full rounded-lg border border-[#d4c9b8] bg-[#FAF3E8] px-3 py-2.5 text-[#2c2419] shadow-none outline-none transition-[box-shadow] placeholder:text-[#8a8578]/80 focus:ring-2 focus:ring-[#1B2A6B]/20";

const errorTextClass = "mt-1 text-sm text-[#a3360b]";

function validateForm(form: FormState): Partial<Record<FieldKey, string>> {
  const errors: Partial<Record<FieldKey, string>> = {};
  if (!form.name.trim()) errors.name = "please enter your name.";
  if (!form.email.trim()) errors.email = "please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "please enter a valid email address.";
  }
  if (!form.what_do_you_do.trim()) {
    errors.what_do_you_do = "please tell us what you do.";
  }
  if (!form.interest) {
    errors.interest = "please choose attending, co-hosting, or both.";
  }
  if (!form.how_did_you_hear.trim()) {
    errors.how_did_you_hear = "please tell us how you heard about 8w8.";
  }
  if (!form.link.trim()) {
    errors.link = "please add a link.";
  }
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<FieldKey, string>>
  >({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function clearFieldError(key: FieldKey) {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");
    setErrorMessage("");

    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

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
      setFieldErrors({});
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#F4E9D8] px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-28">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="font-heading text-center text-2xl font-normal italic tracking-tight text-[#1B2A6B] sm:text-3xl">
          get in touch
        </h1>

        {status === "success" ? (
          <p className="font-body mt-10 text-center text-base leading-relaxed text-[#2c2419]">
            thanks for reaching out! we&apos;ll be in touch soon.
          </p>
        ) : (
          <form
            className="font-body mt-10 space-y-6"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-[#1B2A6B]"
              >
                name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={(e) => {
                  setForm((f) => ({ ...f, name: e.target.value }));
                  clearFieldError("name");
                }}
                className={inputClass}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
              />
              {fieldErrors.name ? (
                <p id="name-error" className={errorTextClass} role="alert">
                  {fieldErrors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[#1B2A6B]"
              >
                email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => {
                  setForm((f) => ({ ...f, email: e.target.value }));
                  clearFieldError("email");
                }}
                className={inputClass}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={
                  fieldErrors.email ? "email-error" : undefined
                }
              />
              {fieldErrors.email ? (
                <p id="email-error" className={errorTextClass} role="alert">
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="what_do_you_do"
                className="mb-1.5 block text-sm font-medium text-[#1B2A6B]"
              >
                what do you do?
              </label>
              <input
                id="what_do_you_do"
                name="what_do_you_do"
                type="text"
                required
                value={form.what_do_you_do}
                onChange={(e) => {
                  setForm((f) => ({ ...f, what_do_you_do: e.target.value }));
                  clearFieldError("what_do_you_do");
                }}
                className={inputClass}
                aria-invalid={Boolean(fieldErrors.what_do_you_do)}
                aria-describedby={
                  fieldErrors.what_do_you_do ? "what_do_you_do-error" : undefined
                }
              />
              {fieldErrors.what_do_you_do ? (
                <p
                  id="what_do_you_do-error"
                  className={errorTextClass}
                  role="alert"
                >
                  {fieldErrors.what_do_you_do}
                </p>
              ) : null}
            </div>

            <fieldset
              className="space-y-2"
              aria-invalid={Boolean(fieldErrors.interest)}
              aria-describedby={
                fieldErrors.interest ? "interest-error" : undefined
              }
            >
              <legend className="mb-1.5 text-sm font-medium leading-snug text-[#1B2A6B]">
                interested in attending or co-hosting?
              </legend>
              <div className="space-y-2 rounded-lg border border-[#d4c9b8] bg-[#FAF3E8] p-4">
                {(
                  [
                    ["attending", "attending"],
                    ["co-hosting", "co-hosting"],
                    ["both", "both"],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    className="flex min-h-[1.25rem] cursor-pointer items-center gap-2.5 text-sm font-medium leading-snug text-[#1B2A6B]"
                  >
                    <input
                      type="radio"
                      name="interest"
                      value={value}
                      required
                      checked={form.interest === value}
                      onChange={() => {
                        setForm((f) => ({ ...f, interest: value }));
                        clearFieldError("interest");
                      }}
                      className="size-[0.875rem] shrink-0 accent-[#C1440E] border-[#d4c9b8] text-[#C1440E] focus:ring-2 focus:ring-[#1B2A6B]/20"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
              {fieldErrors.interest ? (
                <p id="interest-error" className={errorTextClass} role="alert">
                  {fieldErrors.interest}
                </p>
              ) : null}
            </fieldset>

            <div>
              <label
                htmlFor="how_did_you_hear"
                className="mb-1.5 block text-sm font-medium text-[#1B2A6B]"
              >
                how did you hear about 8w8?
              </label>
              <input
                id="how_did_you_hear"
                name="how_did_you_hear"
                type="text"
                required
                value={form.how_did_you_hear}
                onChange={(e) => {
                  setForm((f) => ({ ...f, how_did_you_hear: e.target.value }));
                  clearFieldError("how_did_you_hear");
                }}
                className={inputClass}
                aria-invalid={Boolean(fieldErrors.how_did_you_hear)}
                aria-describedby={
                  fieldErrors.how_did_you_hear
                    ? "how_did_you_hear-error"
                    : undefined
                }
              />
              {fieldErrors.how_did_you_hear ? (
                <p
                  id="how_did_you_hear-error"
                  className={errorTextClass}
                  role="alert"
                >
                  {fieldErrors.how_did_you_hear}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="link"
                className="mb-1.5 block text-sm font-medium text-[#1B2A6B]"
              >
                link to your linkedin, x, personal website, etc.
              </label>
              <input
                id="link"
                name="link"
                type="text"
                inputMode="url"
                placeholder="https://"
                required
                value={form.link}
                onChange={(e) => {
                  setForm((f) => ({ ...f, link: e.target.value }));
                  clearFieldError("link");
                }}
                className={inputClass}
                aria-invalid={Boolean(fieldErrors.link)}
                aria-describedby={fieldErrors.link ? "link-error" : undefined}
              />
              {fieldErrors.link ? (
                <p id="link-error" className={errorTextClass} role="alert">
                  {fieldErrors.link}
                </p>
              ) : null}
            </div>

            {status === "error" ? (
              <p className="text-sm text-[#a3360b]" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#C1440E] px-4 py-3 text-center font-medium text-[#FAF3E8] transition-colors hover:bg-[#a3360b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A6B] sm:w-auto"
            >
              submit
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
