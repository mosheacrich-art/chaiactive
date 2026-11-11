import type { ReactNode } from "react";
import ScrollReveal from "@/components/about/ScrollReveal";

// Closing call to action above the contact section on each audience page.
export default function CtaBand({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <section className="px-4 pt-20 sm:px-6 sm:pt-28">
      <ScrollReveal className="mx-auto max-w-4xl rounded-[2rem] surface-haze px-6 py-14 text-center sm:px-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">{body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">{children}</div>
      </ScrollReveal>
    </section>
  );
}
