import { NextResponse } from "next/server";

// Placeholder: stores nothing yet. Wire to an email provider later.
export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "").trim();
  if (!email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  return NextResponse.redirect(new URL("/?joined=1", req.url), 303);
}
