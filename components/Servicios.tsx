import { useTranslations } from "next-intl";
import {
  Home,
  CalendarDays,
  Ticket,
  Droplet,
  HeartHandshake,
  Sparkles,
  BookOpen,
  Handshake,
  UserCheck,
} from "lucide-react";

const icons = [
  Home,
  CalendarDays,
  Ticket,
  Droplet,
  HeartHandshake,
  Sparkles,
  BookOpen,
  Handshake,
  UserCheck,
];

type Module = { title: string; body: string; highlight?: string };

export default function Servicios() {
  const t = useTranslations("servicios");
  const modules = t.raw("modules") as Module[];

  return (
    <section id="servicios" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-navy/70">{t("intro")}</p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod, i) => {
          const Icon = icons[i];
          return (
            <div
              key={mod.title}
              className="flex flex-col rounded-2xl border border-navy/10 bg-white/60 p-6"
            >
              <Icon className="size-7 text-navy" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-lg font-semibold text-navy">
                {mod.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">
                {mod.body}
              </p>
              {mod.highlight && (
                <p className="mt-3 text-xs font-semibold text-gold">
                  {mod.highlight}
                </p>
              )}
              <p className="mt-4 text-xs font-medium text-navy/50">
                {t("standaloneNote")}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
