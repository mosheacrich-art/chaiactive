import { useTranslations } from "next-intl";
import { ShieldCheck, UserCheck, ScrollText, Lock } from "lucide-react";

const icons = [UserCheck, ShieldCheck, ScrollText, Lock];

export default function Seguridad() {
  const t = useTranslations("seguridad");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
        {t("title")}
      </h2>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div key={item.title} className="rounded-2xl bg-cream p-6">
              <Icon className="size-6 text-navy" aria-hidden="true" />
              <h3 className="mt-3 font-bold text-navy">{item.title}</h3>
              <p className="mt-1 text-sm text-ink/60">{item.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
