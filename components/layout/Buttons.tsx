import type { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export const buttonPrimary = `${base} bg-navy text-white hover:bg-navy-light`;
export const buttonSecondary = `${base} border border-navy/20 text-navy hover:bg-navy/5`;

// Anchor to the contact form. `interest` preselects "¿Qué te interesa?":
// the form listens for clicks on [data-interest] links
// (see components/contact/ContactPhoneDemo).
export function ContactLink({
  interest,
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { interest?: string; variant?: "primary" | "secondary" }) {
  return (
    <a
      href="#contacto"
      data-interest={interest}
      className={`${variant === "primary" ? buttonPrimary : buttonSecondary} ${className}`}
      {...props}
    />
  );
}
