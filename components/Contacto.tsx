"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Mail } from "lucide-react";
import PhoneFrame from "./contact/PhoneFrame";
import ContactPhoneDemo from "./contact/ContactPhoneDemo";
import { WhatsAppIcon } from "./contact/icons";
import { CONTACT_EMAIL, WHATSAPP_URL, type Interest } from "@/lib/contact";

const channel =
  "flex items-center gap-3 rounded-2xl border border-navy/10 bg-white px-5 py-4 text-start shadow-sm transition hover:border-navy/25 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export default function Contacto({ defaultInterest }: { defaultInterest?: Interest }) {
  const t = useTranslations("contacto");
  const reduceMotion = useReducedMotion();

  return (
    <section id="contacto" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("title")}</h2>
        <p className="mt-3 text-ink/65">{t("intro")}</p>
      </div>

      {/* Direct channels first: WhatsApp and email are the main ways in. */}
      <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
        {WHATSAPP_URL && (
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={channel}>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
              <WhatsAppIcon className="size-6 text-white" />
            </span>
            <span>
              <span className="block text-sm font-bold text-navy">WhatsApp</span>
              <span className="block text-xs text-ink/60">{t("channels.whatsapp")}</span>
            </span>
          </a>
        )}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className={`${channel} ${WHATSAPP_URL ? "" : "sm:col-span-2 sm:justify-center"}`}
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy">
            <Mail className="size-5 text-white" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-bold text-navy">{t("channels.emailLabel")}</span>
            <span className="block text-xs text-ink/60" dir="ltr">{CONTACT_EMAIL}</span>
          </span>
        </a>
      </div>

      <p className="mt-10 text-center text-sm font-medium text-ink/60">{t("orForm")}</p>

      <div className="relative mt-4 flex justify-center py-2">
        {WHATSAPP_URL && (
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute start-0 top-4 z-10 hidden w-[190px] rounded-2xl bg-navy p-4 shadow-xl shadow-navy/20 lg:block"
            aria-hidden="true"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-gold">
              <WhatsAppIcon className="size-4 text-navy-dark" />
            </span>
            <p className="mt-2.5 text-sm font-semibold text-white">{t("floatingWhatsapp.title")}</p>
            <p className="mt-0.5 text-xs text-white/70">{t("floatingWhatsapp.body")}</p>
          </motion.div>
        )}

        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute end-0 bottom-4 z-10 hidden w-[190px] rounded-2xl bg-white p-4 shadow-xl shadow-navy/10 lg:block"
          aria-hidden="true"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-gold/20">
            <Check className="size-3.5 text-gold-dark" aria-hidden="true" />
          </span>
          <p className="mt-2 text-sm font-bold text-navy">{t("floatingSent.title")}</p>
          <p className="mt-0.5 text-xs text-ink/60">{t("floatingSent.body")}</p>
        </motion.div>

        <PhoneFrame>
          <ContactPhoneDemo defaultInterest={defaultInterest} />
        </PhoneFrame>
      </div>
    </section>
  );
}
