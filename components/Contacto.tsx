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
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-ink/60">{t("intro")}</p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl bg-cream p-6 sm:p-8">
          <ContactForm />
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl bg-cream p-6">
            <CalendarClock className="size-6 text-navy" aria-hidden="true" />
            <h3 className="mt-3 font-bold text-navy">{t("calendly.title")}</h3>
            <p className="mt-1 text-sm text-ink/60">{t("calendly.body")}</p>
            <a
              href={CALENDLY_URL}
              className="mt-4 inline-block rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-light"
            >
              {t("calendly.cta")}
            </a>
            <p className="mt-2 text-xs text-ink/30">{t("calendly.todo")}</p>
          </div>

          <div className="rounded-2xl bg-cream p-6">
            <MessageCircle className="size-6 text-navy" aria-hidden="true" />
            <h3 className="mt-3 font-bold text-navy">{t("whatsapp.title")}</h3>
            <a
              href={WHATSAPP_URL}
              className="mt-4 inline-block rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy/5"
            >
              {t("whatsapp.cta")}
            </a>
            <p className="mt-2 text-xs text-ink/30">{t("whatsapp.todo")}</p>
          </div>

          <div className="rounded-2xl bg-cream p-6">
            <Mail className="size-6 text-navy" aria-hidden="true" />
            <h3 className="mt-3 font-bold text-navy">{t("email.title")}</h3>
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
