// Public contact channels. Both are read from env so the real values can be
// changed in Vercel without touching code (see README → Variables de entorno).
// TODO(datos): definir NEXT_PUBLIC_WHATSAPP_URL con el número real (formato https://wa.me/34XXXXXXXXX).
export const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || "";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "jactive@gmail.com";

export const INTERESTS = ["comunidad", "colegio", "empresa", "otra"] as const;
export type Interest = (typeof INTERESTS)[number];

export function isInterest(value: unknown): value is Interest {
  return typeof value === "string" && (INTERESTS as readonly string[]).includes(value);
}
