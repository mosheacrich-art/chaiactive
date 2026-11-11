import type { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame";

export const buttonPrimary = `${base} bg-royal text-white hover:bg-flame`;
export const buttonSecondary = `${base} border border-navy/20 text-navy hover:border-royal hover:text-royal`;

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
