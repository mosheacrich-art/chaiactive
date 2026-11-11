import { useTranslations } from "next-intl";
import {
  BookOpenCheck,
  CalendarHeart,
  ClipboardList,
  Compass,
  Database,
  Download,
  EyeOff,
  FileSearch,
  FileSpreadsheet,
  HeartHandshake,
  KeyRound,
  Languages,
  LayoutDashboard,
  Lock,
  MessagesSquare,
  MoonStar,
  PenLine,
  School,
  Server,
  ShieldCheck,
  Sparkles,
  Timer,
  TriangleAlert,
  UserRound,
  Users,
  UsersRound,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/about/ScrollReveal";

type Item = { title: string; body: string };

function Heading({ title, intro, eyebrow, light }: { title: string; intro?: string; eyebrow?: string; light?: boolean }) {
  return (
    <ScrollReveal className="max-w-2xl">
      {eyebrow && (
        <p className={`text-sm font-semibold uppercase tracking-wider ${light ? "text-gold-light" : "text-gold-dark"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${light ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg ${light ? "text-white/80" : "text-ink/70"}`}>{intro}</p>}
    </ScrollReveal>
  );
}

export function Pilares() {
  const t = useTranslations("colegios.pilares");
  const items = t.raw("items") as Item[];
  const icons = [BookOpenCheck, MessagesSquare, HeartHandshake];
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Heading title={t("title")} intro={t("intro")} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={item.title} delay={i * 0.06} className="rounded-3xl bg-cream p-8">
                <Icon className="size-8 text-navy" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/70">{item.body}</p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Perfiles() {
  const t = useTranslations("colegios.perfiles");
  const items = t.raw("items") as Item[];
  const icons = [UserRound, Users, PenLine, UsersRound, ClipboardList, School];
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Heading title={t("title")} intro={t("intro")} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <li key={item.title} className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy/5">
                  <Icon className="size-5 text-navy" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-bold text-navy">{item.title}</h3>
                  <p className="mt-1 text-[15px] text-ink/70">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 flex items-start gap-3 rounded-2xl border border-navy/10 bg-white/60 p-5 text-ink/75">
          <KeyRound className="mt-0.5 size-5 shrink-0 text-gold-dark" aria-hidden="true" />
          {t("security")}
        </p>
      </div>
    </section>
  );
}

export function CapaJudia() {
  const t = useTranslations("colegios.capaJudia");
  const items = t.raw("items") as Item[];
  const icons: LucideIcon[] = [
    CalendarHeart, CalendarHeart, MoonStar, TriangleAlert, MoonStar,
    Languages, UtensilsCrossed, HeartHandshake, Users, Languages,
  ];
  return (
    <section id="vida-judia" className="relative scroll-mt-20 overflow-hidden bg-navy py-24 sm:py-32">
      <span
        aria-hidden="true"
        className="font-hebrew pointer-events-none absolute -bottom-16 start-[-1rem] select-none text-[18rem] leading-none text-white/[0.04]"
      >
        לוח
      </span>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Heading eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} light />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <li key={item.title} className="bg-navy p-6">
                <Icon className="size-6 text-gold-light" aria-hidden="true" />
                <h3 className="mt-4 font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{item.body}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-10 max-w-3xl text-lg font-medium text-white/90">{t("note")}</p>
      </div>
    </section>
  );
}

export function Profesorado() {
  const t = useTranslations("colegios.profesorado");
  const items = t.raw("items") as Item[];
  const icons = [LayoutDashboard, PenLine, ClipboardList, UsersRound, TriangleAlert, Timer, Download, FileSpreadsheet];
  return (
    <section className="surface-haze py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Heading title={t("title")} intro={t("intro")} />
        <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <li key={item.title}>
                <Icon className="size-6 text-navy" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-navy">{item.title}</h3>
                <p className="mt-1.5 text-[15px] text-ink/70">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Privacidad() {
  const t = useTranslations("colegios.privacidad");
  const items = t.raw("items") as Item[];
  const icons = [Database, ShieldCheck, Server, Lock, KeyRound, EyeOff, FileSearch, EyeOff, Download];
  return (
    <section id="privacidad" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ShieldCheck className="size-10 text-navy" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-ink/70">{t("intro")}</p>
        </div>
        <ul className="divide-y divide-navy/10 rounded-3xl border border-navy/10">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <li key={item.title} className="flex gap-4 p-6">
                <Icon className="mt-0.5 size-5 shrink-0 text-gold-dark" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-navy">{item.title}</h3>
                  <p className="mt-1 text-[15px] text-ink/70">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Futuro() {
  const t = useTranslations("colegios.futuro");
  const items = t.raw("items") as string[];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border-2 border-dashed border-navy/20 p-8 sm:p-12">
          <div className="flex items-center gap-3">
            <Compass className="size-7 text-gold-dark" aria-hidden="true" />
            <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{t("title")}</h2>
          </div>
          <p className="mt-3 text-ink/70">{t("intro")}</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {items.map((item) => (
              <li key={item} className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-medium text-ink/80">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Empezamos() {
  const t = useTranslations("colegios.empezamos");
  const steps = t.raw("steps") as Item[];
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Heading title={t("title")} intro={t("intro")} />
        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {steps.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl bg-white p-6 shadow-sm">
              <span className="flex size-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-bold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
