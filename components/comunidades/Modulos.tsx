import { useTranslations } from "next-intl";
import {
  BookOpen,
  Briefcase,
  CalendarDays,
  Droplets,
  HandHeart,
  LayoutDashboard,
  Sparkles,
  Ticket,
  UserCheck,
} from "lucide-react";
import ScrollReveal from "@/components/about/ScrollReveal";

// Order matches `comunidades.modulos.items` in messages/*.json.
const ICONS = [UserCheck, CalendarDays, Ticket, Droplets, HandHeart, Sparkles, BookOpen, Briefcase, LayoutDashboard];

type Item = { title: string; body: string };

export default function Modulos() {
  const t = useTranslations("comunidades.modulos");
  const items = t.raw("items") as Item[];

  return (
    <section id="modulos" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-ink/70">{t("intro")}</p>
        </ScrollReveal>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <li key={item.title} className="bg-white p-7">
                <Icon className="size-6 text-gold-dark" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
