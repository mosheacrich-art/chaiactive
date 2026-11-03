import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isInterest } from "@/lib/contact";

// Contact backend: Resend.
// - CONTACT_TO_EMAIL: where submissions arrive.
// - RESEND_FROM: sender. Until the chaiactive.com domain is verified in Resend
//   it must stay on Resend's test sender (onboarding@resend.dev). Once verified,
//   set e.g. RESEND_FROM="Chai Active <hola@chaiactive.com>". See README.
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "jactive@gmail.com";
const RESEND_FROM = process.env.RESEND_FROM || "Chai Active <onboarding@resend.dev>";

const INTEREST_LABELS = {
  comunidad: "Comunidad",
  colegio: "Colegio o institución",
  empresa: "Empresa",
  otra: "Otra cosa",
} as const;

const MAX = { name: 200, email: 320, community: 200, message: 5000 };

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  const str = (key: keyof typeof MAX) =>
    typeof body[key] === "string" ? (body[key] as string).trim().slice(0, MAX[key]) : "";
  const name = str("name");
  const email = str("email");
  const community = str("community");
  const message = str("message");
  const interest = isInterest(body.interest) ? INTEREST_LABELS[body.interest] : "Sin indicar";

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error(
      "RESEND_API_KEY is not set — contact form submissions cannot be delivered. " +
        "Set it in your environment (see README) to enable email sending."
    );
    return NextResponse.json({ ok: false, error: "email service not configured" }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[${interest}] Nuevo contacto desde chaiactive.com: ${name}`,
      text: [
        `Le interesa: ${interest}`,
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Comunidad/organización: ${community || "-"}`,
        "",
        message,
      ].join("\n"),
    });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json({ ok: false, error: "send failed" }, { status: 500 });
  }
}
