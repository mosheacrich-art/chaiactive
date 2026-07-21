import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy/10 bg-navy py-12 text-cream/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <p className="font-serif text-xl font-bold text-cream">Chai Active</p>
            <p className="mt-2 max-w-xs text-sm">{t("footer.tagline")}</p>
            <p className="mt-2 text-xs text-cream/40">{t("footer.pendingDomain")}</p>
          </div>

          <nav className="flex flex-col gap-2 text-sm sm:items-end">
            <a href="#que-hacemos" className="hover:text-cream">
              {t("nav.queHacemos")}
            </a>
            <a href="#servicios" className="hover:text-cream">
              {t("nav.servicios")}
            </a>
            <a href="#casos" className="hover:text-cream">
              {t("nav.casos")}
            </a>
            <a href="#contacto" className="hover:text-cream">
              {t("nav.contacto")}
            </a>
          </nav>

          <nav className="flex flex-col gap-2 text-sm sm:items-end">
            <Link href="/aviso-legal" className="hover:text-cream">
              {t("footer.legalLinks.avisoLegal")}
            </Link>
            <Link href="/privacidad" className="hover:text-cream">
              {t("footer.legalLinks.privacidad")}
            </Link>
            <Link href="/cookies" className="hover:text-cream">
              {t("footer.legalLinks.cookies")}
            </Link>
          </nav>
        </div>

        <p className="mt-10 border-t border-cream/10 pt-6 text-xs text-cream/50">
          {t("footer.rights", { year })}
        </p>
      </div>
    </footer>
  );
}
