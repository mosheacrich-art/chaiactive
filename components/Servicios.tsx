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
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {t("title")}
        </h2>
        <p className="text-sm font-medium text-gold">{t("standaloneNote")}</p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod, i) => {
          const Icon = icons[i];
          return (
            <div
              key={mod.title}
              className="rounded-2xl border border-black/5 bg-cream/60 p-6"
            >
              <Icon className="size-6 text-navy" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-navy">{mod.title}</h3>
              <p className="mt-1 text-sm text-ink/60">{mod.body}</p>
              {mod.highlight && (
                <p className="mt-3 text-xs font-semibold text-gold">
                  {mod.highlight}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
