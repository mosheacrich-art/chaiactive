import { NextResponse } from "next/server";
import { Resend } from "resend";

// Contact backend: Resend, chosen to match the Resend account already used
// by the Creative Favours project in this same ecosystem. Swap providers by
// replacing this file if that decision changes.
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "jactive@gmail.com";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, community, message } = body as {
    name?: string;
    email?: string;
    community?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error(
      "RESEND_API_KEY is not set — contact form submissions cannot be delivered. " +
        "Set it in your environment (see README) to enable email sending."
    );
    return NextResponse.json(
      { ok: false, error: "email service not configured" },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Chai Active <onboarding@resend.dev>",
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Nuevo contacto desde chaiactive.com — ${name}`,
      text: [
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Comunidad/organización: ${community || "—"}`,
        "",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json({ ok: false, error: "send failed" }, { status: 500 });
  }
}
