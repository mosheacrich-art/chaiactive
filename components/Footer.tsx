import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-cream py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-start">
          <div>
            <p className="text-lg font-bold text-navy">Chai Active</p>
            <p className="mt-1 text-sm text-ink/50">{t("footer.tagline")}</p>
            <p className="mt-1 text-xs text-ink/30">{t("footer.pendingDomain")}</p>
          </div>

          <nav className="flex flex-col gap-2 text-sm">
            <a href="#servicios" className="text-ink/60 hover:text-navy">{t("nav.servicios")}</a>
            <a href="#casos" className="text-ink/60 hover:text-navy">{t("nav.casos")}</a>
            <a href="#contacto" className="text-ink/60 hover:text-navy">{t("nav.contacto")}</a>
          </nav>

          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/aviso-legal" className="text-ink/60 hover:text-navy">
              {t("footer.legalLinks.avisoLegal")}
            </Link>
            <Link href="/privacidad" className="text-ink/60 hover:text-navy">
              {t("footer.legalLinks.privacidad")}
            </Link>
            <Link href="/cookies" className="text-ink/60 hover:text-navy">
              {t("footer.legalLinks.cookies")}
            </Link>
          </nav>
        </div>

        <p className="mt-10 border-t border-black/5 pt-6 text-center text-xs text-ink/30">
          {t("footer.rights", { year })}
        </p>
      </div>
    </footer>
  );
}
