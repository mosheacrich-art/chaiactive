import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { WhatsAppIcon } from "./contact/icons";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/contact";

const linkCls = "rounded text-ink/70 transition hover:text-navy";
type Href = ComponentProps<typeof Link>["href"];

function Column({ title, links }: { title: string; links: { label: string; href: Href }[] }) {
  return (
    <div>
      <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-navy">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className={linkCls}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-cream pb-10 pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div className="sm:col-span-3 lg:col-span-1">
            <p className="font-display text-2xl font-bold text-navy">Chai Active</p>
            <p className="mt-2 max-w-[16rem] text-sm text-ink/70">{t("tagline")}</p>
            <p className="mt-1 text-sm text-ink/70">{t("location")}</p>
            <div className="mt-6">
              <LanguageSwitcher placement="up" />
            </div>
          </div>

          <Column
            title={nav("comunidades")}
            links={[
              { label: t("cols.kehal"), href: "/comunidades" },
              { label: t("cols.modulos"), href: { pathname: "/comunidades", hash: "modulos" } },
            ]}
          />
          <Column
            title={nav("colegios")}
            links={[
              { label: t("cols.propuesta"), href: "/colegios" },
              { label: t("cols.vidaJudia"), href: { pathname: "/colegios", hash: "vida-judia" } },
              { label: t("cols.privacidad"), href: { pathname: "/colegios", hash: "privacidad" } },
            ]}
          />
          <Column
            title={nav("empresas")}
            links={[
              { label: t("cols.servicios"), href: "/empresas" },
              { label: t("cols.proyectos"), href: { pathname: "/empresas", hash: "proyectos" } },
            ]}
          />
          <Column
            title={t("cols.empresa")}
            links={[
              { label: nav("nosotros"), href: { pathname: "/", hash: "nosotros" } },
              { label: nav("casos"), href: { pathname: "/", hash: "casos" } },
            ]}
          />
          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-navy">{nav("contacto")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {WHATSAPP_URL && (
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${linkCls}`}>
                    <WhatsAppIcon className="size-4 text-[#128C4A]" />
                    WhatsApp
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`inline-flex items-center gap-2 break-all ${linkCls}`} dir="ltr">
                  <Mail className="size-4 shrink-0 text-navy" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-6 text-xs text-ink/65 sm:flex-row">
          <p>{t("rights", { year })}</p>
          <nav aria-label={t("legalLabel")} className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link href="/aviso-legal" className={linkCls}>{t("legalLinks.avisoLegal")}</Link>
            <Link href="/privacidad" className={linkCls}>{t("legalLinks.privacidad")}</Link>
            <Link href="/cookies" className={linkCls}>{t("legalLinks.cookies")}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
