"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Hand, Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import IPhoneFrame, { IPHONE } from "@/components/demo/IPhoneFrame";
import ScreenshotSlideshow from "@/components/casos/ScreenshotSlideshow";
import { KEHAL_DEMO_URL } from "@/lib/contact";

// Hero showcase: a browser window with one tab per project and an iPhone in
// front. Picking a project loads its real site, live and navigable, on
// desktop (browser) and mobile (iPhone). Kehál uses the demo (fictitious data).
// Perashapp sends X-Frame-Options: SAMEORIGIN, so it shows real screenshots.

type Project = {
  slug: "kehal" | "shevat" | "better-coffee" | "creative-favours" | "perashapp";
  name: string;
  host: string;
  site: string;
  live?: (lang: string) => string; // embeddable live URL
  screenshots?: string[]; // fallback when the site can't be framed
  caseHref: "/comunidades" | "/empresas";
};

function demoUrl(lang: string) {
  try {
    const u = new URL(KEHAL_DEMO_URL);
    u.searchParams.set("showcase", "1");
    u.searchParams.set("as", "member");
    u.searchParams.set("lang", lang);
    return u.toString();
  } catch {
    return KEHAL_DEMO_URL;
  }
}

const PROJECTS: Project[] = [
  { slug: "kehal", name: "Kehál", host: "kehal · demo", site: KEHAL_DEMO_URL, live: demoUrl, caseHref: "/comunidades" },
  { slug: "shevat", name: "Shevat", host: "shevat.eu", site: "https://shevat.eu", live: () => "https://shevat.eu/", caseHref: "/empresas" },
  {
    slug: "better-coffee",
    name: "Better Coffee",
    host: "better-coffee.vercel.app",
    site: "https://better-coffee.vercel.app",
    live: () => "https://better-coffee.vercel.app/",
    caseHref: "/empresas",
  },
  {
    slug: "creative-favours",
    name: "Creative Favours",
    host: "creativefavours.vercel.app",
    site: "https://creativefavours.vercel.app",
    live: () => "https://creativefavours.vercel.app/",
    caseHref: "/empresas",
  },
  {
    slug: "perashapp",
    name: "Perashapp",
    host: "perashapp.com",
    site: "https://perashapp.com",
    screenshots: [
      "casos/perashapp/landing.png",
      "casos/perashapp/parashot-list.png",
      "casos/perashapp/torah-reading.png",
      "casos/perashapp/tikkun-korim.png",
    ],
    caseHref: "/empresas",
  },
];

const DESKTOP = { w: 1280, h: 800 };
const SANDBOX = "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals";

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

const COARSE = "(pointer: coarse)";
function useCoarse() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(COARSE);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(COARSE).matches,
    () => false
  );
}

// A live iframe with a loading veil, and (on touch screens) a tap-to-use
// overlay so the page keeps scrolling until the visitor chooses to interact.
function LiveScreen({
  src,
  title,
  width,
  height,
  tapLabel,
}: {
  src: string;
  title: string;
  width: number;
  height: number;
  tapLabel: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);
  const coarse = useCoarse();
  const blocked = coarse && !active;
  return (
    <div className="relative bg-white" style={{ width, height }}>
      <iframe
        src={src}
        title={title}
        sandbox={SANDBOX}
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setLoaded(true)}
        className={`block border-0 ${blocked ? "pointer-events-none" : ""}`}
        style={{ width, height }}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream" aria-hidden="true">
          <span className="size-10 animate-spin rounded-full border-4 border-navy/15 border-t-navy motion-reduce:animate-none" />
        </div>
      )}
      {blocked && loaded && (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 flex items-end justify-center pb-16"
          aria-label={tapLabel}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-xl font-semibold text-white shadow-lg">
            <Hand className="size-6" aria-hidden="true" />
            {tapLabel}
          </span>
        </button>
      )}
    </div>
  );
}

export default function ProjectShowcase() {
  const t = useTranslations("showcase");
  const locale = useLocale();
  const lang = locale === "es" ? "es" : "en";
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState<Project["slug"]>("kehal");
  const [boxRef, boxW] = useWidth<HTMLDivElement>();

  const project = PROJECTS.find((p) => p.slug === current)!;
  // Same measurement drives layout and picker (browser tabs vs. pills).
  const wide = boxW >= 700;

  // Browser takes ~82% of the width on wide screens; the phone overlaps it.
  const browserW = wide ? boxW * 0.82 : boxW;
  const bScale = browserW / DESKTOP.w;
  const chromeH = 76; // tab strip + address bar (unscaled, real px)
  const browserH = chromeH + DESKTOP.h * bScale;
  const phoneScale = wide ? Math.min(0.72, (browserH * 0.98) / IPHONE.height) : Math.min(0.8, (boxW * 0.82) / IPHONE.width);
  const phoneW = IPHONE.width * phoneScale;
  const phoneH = IPHONE.height * phoneScale;
  const showPhone = Boolean(project.live);

  const fade = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: reduce ? 0 : 0.3 } },
    exit: { opacity: 0, transition: { duration: reduce ? 0 : 0.15 } },
  };

  return (
    <div className="mx-auto mt-14 max-w-6xl text-start sm:mt-16">
      <p className="text-center text-sm font-semibold text-ink/70">{t("hint")}</p>

      {/* Project picker (on small screens; on wide screens the browser tabs do this) */}
      {!wide && (
      <div
        role="tablist"
        aria-label={t("label")}
        className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] sm:justify-center"
      >
        {PROJECTS.map((p) => (
          <button
            key={p.slug}
            type="button"
            role="tab"
            aria-selected={p.slug === current}
            onClick={() => setCurrent(p.slug)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              p.slug === current ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/15"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
      )}

      <div ref={boxRef} className="relative mt-4 md:mt-6" style={{ height: boxW ? (wide ? Math.max(browserH, phoneH * 0.9) : showPhone ? phoneH : browserH) : 420 }}>
        {boxW > 0 && (
          <>
            {/* Browser (wide screens, or Perashapp on small ones) */}
            {(wide || !showPhone) && (
              <div
                className="shot absolute top-0 bg-white ring-1 ring-navy/10 transition-[inset-inline-start] duration-500 motion-reduce:transition-none"
                style={{ width: browserW, insetInlineStart: wide && !showPhone ? (boxW - browserW) / 2 : 0 }}
              >
                {/* Tab strip */}
                <div className="flex items-end gap-1 bg-[#ece9e3] px-3 pt-2" style={{ height: 40 }} dir="ltr">
                  <span className="me-2 flex gap-1.5 self-center" aria-hidden="true">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                  </span>
                  {wide && (
                    <div role="tablist" aria-label={t("label")} className="flex min-w-0 flex-1 gap-1">
                      {PROJECTS.map((p) => (
                        <button
                          key={p.slug}
                          type="button"
                          role="tab"
                          aria-selected={p.slug === current}
                          onClick={() => setCurrent(p.slug)}
                          className={`min-w-0 max-w-[180px] flex-1 truncate rounded-t-lg px-3 py-2 text-start text-xs font-semibold transition ${
                            p.slug === current ? "bg-white text-navy" : "text-ink/65 hover:bg-white/60"
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Address bar */}
                <div className="flex items-center gap-2 border-b border-navy/10 bg-white px-4" style={{ height: 36 }} dir="ltr">
                  <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-xs text-ink/70">
                    <Lock className="size-3 shrink-0" aria-hidden="true" />
                    <span className="truncate">{project.host}</span>
                  </span>
                </div>
                {/* Viewport, scaled */}
                <div className="relative overflow-hidden" style={{ height: DESKTOP.h * bScale }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={project.slug} {...fade} className="absolute inset-0">
                      {project.live ? (
                        <div style={{ width: DESKTOP.w, height: DESKTOP.h, transform: `scale(${bScale})`, transformOrigin: "top left" }} dir="ltr">
                          <LiveScreen
                            src={project.live(lang)}
                            title={t("desktopTitle", { name: project.name })}
                            width={DESKTOP.w}
                            height={DESKTOP.h}
                            tapLabel={t("tap")}
                          />
                        </div>
                      ) : (
                        <ScreenshotSlideshow images={project.screenshots ?? []} alt={t("screenshotsAlt", { name: project.name })} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* iPhone with the same project's mobile version */}
            <AnimatePresence>
              {showPhone && (
                <motion.div
                  key="phone"
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.4 } }}
                  exit={{ opacity: 0, y: reduce ? 0 : 20, transition: { duration: reduce ? 0 : 0.2 } }}
                  className={wide ? "absolute end-0" : "absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2"}
                  style={{ width: phoneW, height: phoneH, top: wide ? Math.max(0, (browserH - phoneH) / 2 + 30) : 0 }}
                >
                  <div style={{ transform: `scale(${phoneScale})`, transformOrigin: "top left", width: IPHONE.width }} dir="ltr">
                    <IPhoneFrame>
                      <AnimatePresence mode="wait">
                        <motion.div key={project.slug} {...fade} className="absolute inset-0">
                          <LiveScreen
                            src={project.live!(lang)}
                            title={t("mobileTitle", { name: project.name })}
                            width={IPHONE.screenW}
                            height={IPHONE.contentH}
                            tapLabel={t("tap")}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </IPhoneFrame>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Caption for the selected project */}
      <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-6">
        <p className="text-ink/75">
          <span className="font-display text-lg font-bold text-navy">{project.name}</span>
          <span className="mx-2 text-ink/40">·</span>
          {t(`items.${project.slug}`)}
          {project.slug === "kehal" && <span className="ms-2 text-xs font-semibold text-gold-dark">{t("demoNote")}</span>}
        </p>
        <span className="flex gap-4 text-sm font-semibold">
          <Link href={project.caseHref} className="rounded text-navy underline-offset-4 hover:underline">
            {t("seeCase")}
          </Link>
          <a href={project.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded text-navy underline-offset-4 hover:underline">
            {t("openSite")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </span>
      </div>
      {!project.live && (
        <p className="mt-2 text-center text-xs text-ink/60">{t("screenshotsNote")}</p>
      )}
      <span className="sr-only" aria-live="polite">
        {project.name}
      </span>
    </div>
  );
}
