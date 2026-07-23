"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Check, ArrowRight } from "lucide-react";

// TODO: replace with the real WhatsApp number once Isaac provides it.
const WHATSAPP_URL = "https://wa.me/00000000000";

type Tab = "form" | "whatsapp";
type Status = "idle" | "sending" | "success" | "error";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.001 3C9.098 3 3.5 8.598 3.5 15.5c0 2.34.647 4.53 1.77 6.4L3 29l7.3-2.22a12.42 12.42 0 0 0 5.7 1.42h.005c6.902 0 12.5-5.598 12.5-12.5S22.903 3 16.001 3zm5.68 15.14c-.31-.155-1.836-.906-2.12-1.01-.284-.104-.492-.155-.699.156-.207.31-.803 1.01-.984 1.218-.181.207-.362.233-.673.078-.31-.155-1.31-.483-2.494-1.538-.922-.822-1.545-1.836-1.726-2.146-.181-.31-.02-.478.136-.632.14-.14.31-.362.465-.544.155-.181.207-.31.31-.518.104-.207.052-.388-.026-.544-.078-.155-.699-1.685-.958-2.307-.252-.605-.508-.523-.699-.533l-.595-.01c-.207 0-.544.078-.828.388-.284.31-1.086 1.062-1.086 2.59s1.112 3.005 1.267 3.213c.155.207 2.19 3.343 5.306 4.688.741.32 1.319.512 1.77.655.744.237 1.42.203 1.955.123.596-.089 1.836-.75 2.095-1.475.259-.725.259-1.346.181-1.475-.078-.13-.284-.207-.595-.362z" />
    </svg>
  );
}

export default function ContactPhoneDemo() {
  const t = useTranslations("contacto");
  const [tab, setTab] = useState<Tab>("form");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      community: (form.elements.namedItem("community") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex h-full flex-col px-5 pb-5">
      <h3 className="text-lg font-extrabold text-navy">{t("title")}</h3>
      <p className="mt-1 text-xs text-ink/50">{t("phoneSubtitle")}</p>

      <div className="mt-4 flex gap-1 rounded-full bg-white p-1">
        <button
          type="button"
          onClick={() => setTab("form")}
          className={`flex-1 rounded-full py-2 text-xs font-semibold transition ${
            tab === "form" ? "bg-navy text-white" : "text-ink/50"
          }`}
        >
          {t("tabForm")}
        </button>
        <button
          type="button"
          onClick={() => setTab("whatsapp")}
          className={`flex-1 rounded-full py-2 text-xs font-semibold transition ${
            tab === "whatsapp" ? "bg-[#25D366] text-white" : "text-ink/50"
          }`}
        >
          {t("tabWhatsapp")}
        </button>
      </div>

      {tab === "form" ? (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-1 flex-col gap-3 overflow-y-auto">
          <div>
            <label htmlFor="phone-name" className="mb-1 block text-[11px] font-semibold text-navy">
              {t("form.name")}
            </label>
            <input
              id="phone-name"
              name="name"
              type="text"
              required
              onFocus={() => status === "success" && setStatus("idle")}
              className="w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-gold"
            />
          </div>
          <div>
            <label htmlFor="phone-email" className="mb-1 block text-[11px] font-semibold text-navy">
              {t("form.email")}
            </label>
            <input
              id="phone-email"
              name="email"
              type="email"
              required
              onFocus={() => status === "success" && setStatus("idle")}
              className="w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-gold"
            />
          </div>
          <div>
            <label htmlFor="phone-community" className="mb-1 block text-[11px] font-semibold text-navy">
              {t("form.community")}
            </label>
            <input
              id="phone-community"
              name="community"
              type="text"
              onFocus={() => status === "success" && setStatus("idle")}
              className="w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-gold"
            />
          </div>
          <div>
            <label htmlFor="phone-message" className="mb-1 block text-[11px] font-semibold text-navy">
              {t("form.message")}
            </label>
            <textarea
              id="phone-message"
              name="message"
              required
              rows={3}
              onFocus={() => status === "success" && setStatus("idle")}
              className="w-full resize-none rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-gold"
            />
          </div>

          {status === "success" ? (
            <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-100 px-3.5 py-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                <Check className="size-3.5 text-white" aria-hidden="true" />
              </span>
              <p className="text-xs font-semibold leading-snug text-emerald-800">
                {t("form.success")}
              </p>
            </div>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 rounded-full bg-navy py-3 text-sm font-bold text-white transition hover:bg-navy-light disabled:opacity-60"
            >
              {status === "sending" ? t("form.sending") : t("form.submit")}
            </button>
          )}
          {status === "error" && (
            <p className="text-xs font-medium text-red-700">{t("form.error")}</p>
          )}
        </form>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <span className="flex size-[70px] items-center justify-center rounded-full bg-[#25D366]">
            <WhatsAppIcon className="size-9 text-white" />
          </span>
          <div>
            <p className="text-base font-extrabold text-navy">{t("whatsappPanel.title")}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink/50">
              {t("whatsappPanel.body")}
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-bold text-white"
          >
            {t("whatsappPanel.cta")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}
