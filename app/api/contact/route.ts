import { Resend } from "resend";
import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

type ContactPayload = {
  name: string;
  email: string;
  what_do_you_do: string;
  interest: string;
  how_did_you_hear: string;
  link: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(data: ContactPayload) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["What do you do?", data.what_do_you_do],
    ["Interested in attending or co-hosting?", data.interest],
    ["How did you hear about 8w8?", data.how_did_you_hear],
    ["Link", data.link],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e8e0d4;font-weight:600;color:#1B2A6B;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e8e0d4;color:#2c2419;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;background:#F4E9D8;padding:24px;"><p style="color:#1B2A6B;font-size:16px;margin:0 0 16px;">New contact form submission</p><table style="border-collapse:collapse;width:100%;max-width:560px;background:#FAF3E8;">${body}</table></body></html>`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const interestRaw = typeof body.interest === "string" ? body.interest : "";
    const allowedInterest = ["attending", "co-hosting", "both"] as const;
    const interest = allowedInterest.includes(interestRaw as (typeof allowedInterest)[number])
      ? interestRaw
      : "";

    const what =
      typeof body.what_do_you_do === "string" ? body.what_do_you_do.trim() : "";
    const how =
      typeof body.how_did_you_hear === "string"
        ? body.how_did_you_hear.trim()
        : "";
    const linkStr = typeof body.link === "string" ? body.link.trim() : "";

    if (!name || !email || !interest || !what || !how || !linkStr) {
      return NextResponse.json(
        { ok: false, error: "All fields are required." },
        { status: 400 },
      );
    }

    const row = {
      name,
      email,
      what_do_you_do: what,
      interest,
      how_did_you_hear: how,
      link: linkStr,
    };

    const { error: dbError } = await supabase.from("contacts").insert(row);

    if (dbError) {
      console.error("[contact] supabase insert", dbError);
      return NextResponse.json(
        { ok: false, error: "Could not save your submission. Please try again." },
        { status: 500 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      console.error("[contact] missing RESEND_API_KEY");
      return NextResponse.json(
        { ok: false, error: "Server mail is not configured." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const from =
      process.env.RESEND_FROM_EMAIL?.trim() ||
      "Ate with Eight <onboarding@resend.dev>";

    const { error: mailError } = await resend.emails.send({
      from,
      to: "mira.amin1@gmail.com",
      subject: "new 8w8 form submission",
      html: buildEmailHtml(row),
    });

    if (mailError) {
      console.error("[contact] resend", mailError);
      return NextResponse.json(
        { ok: false, error: "Saved, but notification email failed." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact]", e);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
