"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

// Page links go to their own route; "casos" and "nosotros" are sections of
// the home page. Contact is a single button (the form is on every page).
const links = [
  { key: "comunidades", href: "/comunidades" },
  { key: "colegios", href: "/colegios" },
  { key: "empresas", href: "/empresas" },
  { key: "casos", href: { pathname: "/", hash: "casos" } },
  { key: "nosotros", href: { pathname: "/", hash: "nosotros" } },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  // The menu is portalled to <body>: the header's backdrop-blur would
  // otherwise trap a position:fixed child inside the header box.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isActive = (href: (typeof links)[number]["href"]) =>
    typeof href === "string" && pathname === href;

  // Full-screen menu: lock page scroll and close with Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" aria-label="Chai Active" className="rounded">
          <Image
            src="/images/brand/chai-active-icon.png"
            alt="Chai Active"
            width={515}
            height={389}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav
          aria-label={t("label")}
          className="hidden items-center gap-8 lg:flex"
        >
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded text-[15px] font-medium transition hover:text-navy ${
                isActive(link.href) ? "text-navy" : "text-ink/70"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            href="#contacto"
            className="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-light sm:inline-flex"
          >
            {t("cta")}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-full border border-black/10 p-2 text-navy lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label={t("label")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
                className="fixed inset-0 z-[70] flex h-dvh flex-col bg-white lg:hidden"
              >
                <div className="flex items-center justify-between px-4 py-3.5 sm:px-6">
                  <Image
                    src="/images/brand/chai-active-icon.png"
                    alt=""
                    width={515}
                    height={389}
                    className="h-9 w-auto"
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t("closeMenu")}
                    autoFocus
                    className="rounded-full border border-black/10 p-2 text-navy"
                  >
                    <X className="size-5" />
                  </button>
                </div>
                <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
                  {links.map((link, i) => (
                    <motion.div
                      key={link.key}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: reduce ? 0 : 0.04 * i,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded py-2.5 font-display text-4xl font-bold text-navy"
                      >
                        {t(link.key)}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <div className="px-6 pb-10">
                  <a
                    href="#contacto"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-navy py-4 text-base font-semibold text-white"
                  >
                    {t("cta")}
                    <ArrowRight
                      className="size-4 rtl:rotate-180"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}
