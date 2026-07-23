"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import PhoneFrame from "./contact/PhoneFrame";
import ContactPhoneDemo from "./contact/ContactPhoneDemo";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.001 3C9.098 3 3.5 8.598 3.5 15.5c0 2.34.647 4.53 1.77 6.4L3 29l7.3-2.22a12.42 12.42 0 0 0 5.7 1.42h.005c6.902 0 12.5-5.598 12.5-12.5S22.903 3 16.001 3zm5.68 15.14c-.31-.155-1.836-.906-2.12-1.01-.284-.104-.492-.155-.699.156-.207.31-.803 1.01-.984 1.218-.181.207-.362.233-.673.078-.31-.155-1.31-.483-2.494-1.538-.922-.822-1.545-1.836-1.726-2.146-.181-.31-.02-.478.136-.632.14-.14.31-.362.465-.544.155-.181.207-.31.31-.518.104-.207.052-.388-.026-.544-.078-.155-.699-1.685-.958-2.307-.252-.605-.508-.523-.699-.533l-.595-.01c-.207 0-.544.078-.828.388-.284.31-1.086 1.062-1.086 2.59s1.112 3.005 1.267 3.213c.155.207 2.19 3.343 5.306 4.688.741.32 1.319.512 1.77.655.744.237 1.42.203 1.955.123.596-.089 1.836-.75 2.095-1.475.259-.725.259-1.346.181-1.475-.078-.13-.284-.207-.595-.362z" />
    </svg>
  );
}

export default function Contacto() {
  const t = useTranslations("contacto");
  const reduceMotion = useReducedMotion();

  return (
    <section id="contacto" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-ink/60">{t("intro")}</p>
      </div>

      <div className="relative mt-12 flex justify-center py-10">
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute start-0 top-4 z-10 hidden w-[190px] rounded-2xl bg-navy p-4 shadow-xl shadow-navy/20 lg:block"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-gold">
            <WhatsAppIcon className="size-4 text-navy-dark" />
          </span>
          <p className="mt-2.5 text-sm font-semibold text-white">
            {t("floatingWhatsapp.title")}
          </p>
          <p className="mt-0.5 text-xs text-white/60">{t("floatingWhatsapp.body")}</p>
        </motion.div>

        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute end-0 bottom-4 z-10 hidden w-[190px] rounded-2xl bg-white p-4 shadow-xl shadow-navy/10 lg:block"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-gold/20">
            <Check className="size-3.5 text-gold" aria-hidden="true" />
          </span>
          <p className="mt-2 text-sm font-bold text-navy">{t("floatingSent.title")}</p>
          <p className="mt-0.5 text-xs text-ink/50">{t("floatingSent.body")}</p>
        </motion.div>

        <PhoneFrame>
          <ContactPhoneDemo />
        </PhoneFrame>
      </div>
    </section>
  );
}
