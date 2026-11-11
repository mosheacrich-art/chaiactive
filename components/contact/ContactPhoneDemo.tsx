"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Check, ArrowRight } from "lucide-react";
import { INTERESTS, isInterest, WHATSAPP_URL, CONTACT_EMAIL, type Interest } from "@/lib/contact";
import { WhatsAppIcon } from "./icons";

type Tab = "form" | "whatsapp";
type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-xl border border-navy/20 bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40";

export default function ContactPhoneDemo({ defaultInterest }: { defaultInterest?: Interest }) {
  const t = useTranslations("contacto");
  const [tab, setTab] = useState<Tab>("form");
  const [status, setStatus] = useState<Status>("idle");
  const [interest, setInterest] = useState<Interest | "">(defaultInterest ?? "");

  // Any link on the page with data-interest="colegio" (see ContactLink)
  // preselects that option when clicked. `?interes=colegio` in the URL works too,
  // so the selector can be preset from outside the site.
  useEffect(() => {
    // Deferred so it runs after hydration (the server can't see the query string).
    const fromQuery = new URLSearchParams(window.location.search).get("interes");
    const timer = window.setTimeout(() => {
      if (isInterest(fromQuery)) setInterest(fromQuery);
    }, 0);

    function onClick(event: MouseEvent) {
      const link = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-interest]");
      const value = link?.dataset.interest;
      if (isInterest(value)) {
        setInterest(value);
        setTab("form");
      }
    }
    document.addEventListener("click", onClick);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", onClick);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const value = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
    const data = {
      name: value("name"),
      email: value("email"),
      interest: value("interest"),
      community: value("community"),
      message: value("message"),
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
      setInterest(defaultInterest ?? "");
    } catch {
      setStatus("error");
    }
  }

  const resetSuccess = () => status === "success" && setStatus("idle");

  return (
    <div className="flex h-full flex-col px-5 pb-5">
      <p className="text-sm font-semibold text-navy">{t("phoneSubtitle")}</p>

      {WHATSAPP_URL && (
        <div className="mt-4 flex gap-1 rounded-full bg-white p-1" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "form"}
            onClick={() => setTab("form")}
            className={`flex-1 rounded-full py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-gold ${
              tab === "form" ? "bg-navy text-white" : "text-ink/70"
            }`}
          >
            {t("tabForm")}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "whatsapp"}
            onClick={() => setTab("whatsapp")}
            className={`flex-1 rounded-full py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-gold ${
              tab === "whatsapp" ? "bg-[#128C4A] text-white" : "text-ink/70"
            }`}
          >
            {t("tabWhatsapp")}
          </button>
        </div>
      )}

      {tab === "form" ? (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-1 flex-col gap-3 overflow-y-auto">
          <div>
            <label htmlFor="phone-name" className="mb-1 block text-[11px] font-semibold text-navy">
              {t("form.name")}
            </label>
            <input id="phone-name" name="name" type="text" required autoComplete="name"
              placeholder={t("form.namePlaceholder")} onFocus={resetSuccess} className={field} />
          </div>
          <div>
            <label htmlFor="phone-email" className="mb-1 block text-[11px] font-semibold text-navy">
              {t("form.email")}
            </label>
            <input id="phone-email" name="email" type="email" required autoComplete="email"
              placeholder={t("form.emailPlaceholder")} onFocus={resetSuccess} className={field} />
          </div>
          <div>
            <label htmlFor="phone-interest" className="mb-1 block text-[11px] font-semibold text-navy">
              {t("form.interest")}
            </label>
            <select
              id="phone-interest"
              name="interest"
              required
              value={interest}
              onChange={(e) => setInterest(e.target.value as Interest)}
              onFocus={resetSuccess}
              className={field}
            >
              <option value="" disabled>
                {t("form.interestPlaceholder")}
              </option>
              {INTERESTS.map((option) => (
                <option key={option} value={option}>
                  {t(`form.interests.${option}`)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="phone-community" className="mb-1 block text-[11px] font-semibold text-navy">
              {t("form.community")}
            </label>
            <input id="phone-community" name="community" type="text" autoComplete="organization"
              placeholder={t("form.communityPlaceholder")} onFocus={resetSuccess} className={field} />
          </div>
          <div>
            <label htmlFor="phone-message" className="mb-1 block text-[11px] font-semibold text-navy">
              {t("form.message")}
            </label>
            <textarea id="phone-message" name="message" required rows={3}
              placeholder={t("form.messagePlaceholder")} onFocus={resetSuccess}
              className={`${field} resize-none`} />
          </div>

          {status === "success" ? (
            <div role="status" className="flex items-center gap-2.5 rounded-2xl bg-emerald-100 px-3.5 py-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-600">
                <Check className="size-3.5 text-white" aria-hidden="true" />
              </span>
              <p className="text-xs font-semibold leading-snug text-emerald-900">{t("form.success")}</p>
            </div>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 rounded-full bg-royal py-3 text-sm font-bold text-white transition hover:bg-flame focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-60"
            >
              {status === "sending" ? t("form.sending") : t("form.submit")}
            </button>
          )}
          {status === "error" && (
            <p role="alert" className="text-xs font-medium text-red-700">
              {t("form.error", { email: CONTACT_EMAIL })}
            </p>
          )}
        </form>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <span className="flex size-[70px] items-center justify-center rounded-full bg-[#25D366]">
            <WhatsAppIcon className="size-9 text-white" />
          </span>
          <div>
            <p className="text-base font-extrabold text-navy">{t("whatsappPanel.title")}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink/70">{t("whatsappPanel.body")}</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#128C4A] py-3.5 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {t("whatsappPanel.cta")}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}
