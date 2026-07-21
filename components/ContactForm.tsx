"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contacto.form");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      community: (form.elements.namedItem("community") as HTMLInputElement)
        .value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-navy">
            {t("name")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-navy/20 bg-white px-4 py-2.5 text-sm text-navy outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-navy">
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-navy/20 bg-white px-4 py-2.5 text-sm text-navy outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label htmlFor="community" className="mb-1 block text-sm font-medium text-navy">
          {t("community")}
        </label>
        <input
          id="community"
          name="community"
          type="text"
          className="w-full rounded-lg border border-navy/20 bg-white px-4 py-2.5 text-sm text-navy outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-navy">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full rounded-lg border border-navy/20 bg-white px-4 py-2.5 text-sm text-navy outline-none focus:border-gold"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-navy-light disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>

      {status === "success" && (
        <p className="text-sm font-medium text-emerald-700">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-700">{t("error")}</p>
      )}
    </form>
  );
}
