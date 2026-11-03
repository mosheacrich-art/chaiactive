import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const footerLink = "rounded text-ink/65 hover:text-navy focus-visible:outline-2 focus-visible:outline-gold";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-cream py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:text-start">
          <div className="max-w-xs">
            <p className="text-lg font-bold text-navy">Chai Active</p>
            <p className="mt-1 text-sm text-ink/60">{t("footer.tagline")}</p>
            <p className="mt-1 text-sm text-ink/60">{t("footer.location")}</p>
          </div>

          <nav aria-label={t("footer.navLabel")} className="flex flex-col gap-2 text-sm">
            <Link href="/comunidades" className={footerLink}>{t("nav.comunidades")}</Link>
            <Link href="/colegios" className={footerLink}>{t("nav.colegios")}</Link>
            <Link href="/empresas" className={footerLink}>{t("nav.empresas")}</Link>
            <Link href={{ pathname: "/", hash: "casos" }} className={footerLink}>{t("nav.casos")}</Link>
            <Link href={{ pathname: "/", hash: "nosotros" }} className={footerLink}>{t("nav.nosotros")}</Link>
          </nav>

          <nav aria-label={t("footer.legalLabel")} className="flex flex-col gap-2 text-sm">
            <Link href="/aviso-legal" className={footerLink}>
              {t("footer.legalLinks.avisoLegal")}
            </Link>
            <Link href="/privacidad" className={footerLink}>
              {t("footer.legalLinks.privacidad")}
            </Link>
            <Link href="/cookies" className={footerLink}>
              {t("footer.legalLinks.cookies")}
            </Link>
          </nav>
        </div>

        <p className="mt-10 border-t border-black/5 pt-6 text-center text-xs text-ink/50">
          {t("footer.rights", { year })}
        </p>
      </div>
    </footer>
  );
}
