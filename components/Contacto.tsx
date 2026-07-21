import { useTranslations } from "next-intl";
import { CalendarClock, MessageCircle, Mail } from "lucide-react";
import ContactForm from "./ContactForm";

// TODO: replace with the real WhatsApp number once Isaac provides it.
const WHATSAPP_URL = "https://wa.me/00000000000";
// TODO: replace with the real Calendly scheduling link.
const CALENDLY_URL = "https://calendly.com/chai-active/reunion";

export default function Contacto() {
  const t = useTranslations("contacto");

  return (
    <section id="contacto" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-navy/70">{t("intro")}</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-navy/10 bg-white/60 p-6 sm:p-8">
          <ContactForm />
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-navy/10 bg-white/60 p-6">
            <CalendarClock className="size-6 text-gold" aria-hidden="true" />
            <h3 className="mt-3 font-semibold text-navy">
              {t("calendly.title")}
            </h3>
            <p className="mt-1 text-sm text-navy/70">{t("calendly.body")}</p>
            <a
              href={CALENDLY_URL}
              className="mt-4 inline-block rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-navy-light"
            >
              {t("calendly.cta")}
            </a>
            <p className="mt-2 text-xs text-navy/40">{t("calendly.todo")}</p>
          </div>

          <div className="rounded-2xl border border-navy/10 bg-white/60 p-6">
            <MessageCircle className="size-6 text-gold" aria-hidden="true" />
            <h3 className="mt-3 font-semibold text-navy">
              {t("whatsapp.title")}
            </h3>
            <a
              href={WHATSAPP_URL}
              className="mt-4 inline-block rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy/5"
            >
              {t("whatsapp.cta")}
            </a>
            <p className="mt-2 text-xs text-navy/40">{t("whatsapp.todo")}</p>
          </div>

          <div className="rounded-2xl border border-navy/10 bg-white/60 p-6">
            <Mail className="size-6 text-gold" aria-hidden="true" />
            <h3 className="mt-3 font-semibold text-navy">{t("email.title")}</h3>
            <a
              href={`mailto:${t("email.address")}`}
              className="mt-2 inline-block text-sm font-medium text-navy underline underline-offset-2"
            >
              {t("email.address")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
