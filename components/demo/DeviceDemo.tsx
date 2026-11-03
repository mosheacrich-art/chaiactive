"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ExternalLink, Laptop, RotateCcw, Smartphone, Hand } from "lucide-react";
import IPhoneFrame, { IPHONE } from "./IPhoneFrame";

// A live demo app inside a drawn iPhone or laptop, like the Xcode simulator:
// the iframe is the real app, fully interactive, scaled to fit the page.
//
// The demo app must:
//  - allow being framed (no X-Frame-Options / restrictive frame-ancestors),
//  - honour ?showcase=1 (keeps its own navigation inside the iframe),
//  - use fictitious data only.
// The sandbox has no allow-top-navigation, so the demo can never navigate
// chaiactive.com away.

type Device = "phone" | "laptop";

// Native sizes (CSS px) of each device; everything is scaled from these.
const LAPTOP = { screenW: 1280, screenH: 800, bezel: 16, base: 22 };

const COARSE = "(pointer: coarse)";
function useCoarsePointer() {
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

// Viewport height, so the phone never ends up taller than the screen.
function useViewportHeight() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => window.innerHeight,
    () => 900
  );
}

function withShowcase(url: string, lang: string, as: "member" | "admin") {
  try {
    const u = new URL(url);
    u.searchParams.set("showcase", "1");
    u.searchParams.set("lang", lang);
    // Start already inside the app (member home), not on the login screen.
    u.searchParams.set("as", as);
    return u.toString();
  } catch {
    return url;
  }
}

export default function DeviceDemo({
  src,
  title,
  badge,
  devices = ["phone", "laptop"],
  maxPhoneHeight = 760,
  as = "member",
  bare = false,
  eager = false,
}: {
  src: string;
  title: string;
  badge?: string;
  devices?: Device[];
  maxPhoneHeight?: number;
  as?: "member" | "admin";
  /** Phone only, no controls or badge (used inside the home hero). */
  bare?: boolean;
  eager?: boolean;
}) {
  const t = useTranslations("demo");
  const [device, setDevice] = useState<Device>(devices[0]);
  const [reloadKey, setReloadKey] = useState(0);
  const [activated, setActivated] = useState(false);
  const coarse = useCoarsePointer();
  const [boxRef, boxWidth] = useWidth<HTMLDivElement>();
  const viewportH = useViewportHeight();

  // The demo speaks es/en: Spanish visitors get Spanish, everyone else English.
  const locale = useLocale();
  const url = withShowcase(src, locale === "es" ? "es" : "en", as);

  // Full device sizes, then the scale that fits the available box.
  const phoneW = IPHONE.width;
  const phoneH = IPHONE.height;
  const laptopW = LAPTOP.screenW + LAPTOP.bezel * 2;
  const laptopH = LAPTOP.screenH + LAPTOP.bezel * 2 + LAPTOP.base;
  const natW = device === "phone" ? phoneW : laptopW;
  const natH = device === "phone" ? phoneH : laptopH;
  // Leave room for the sticky header and the controls above the device.
  const fitH = bare ? maxPhoneHeight : Math.max(480, viewportH - 150);
  const maxH = device === "phone" ? Math.min(maxPhoneHeight, fitH) : fitH;
  const scale = boxWidth ? Math.min(1, boxWidth / natW, maxH / natH) : 0;

  // On touch screens the page must stay scrollable: the demo only takes
  // touches after an explicit tap.
  const blocked = coarse && !activated;

  const frame = (
    <iframe
      key={`${device}-${reloadKey}`}
      src={url}
      title={title}
      loading={eager ? "eager" : "lazy"}
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals"
      referrerPolicy="strict-origin-when-cross-origin"
      className={`block border-0 bg-white ${blocked ? "pointer-events-none" : ""}`}
      style={
        device === "phone"
          ? { width: IPHONE.screenW, height: IPHONE.contentH }
          : { width: LAPTOP.screenW, height: LAPTOP.screenH }
      }
    />
  );

  return (
    <div className="flex flex-col items-center">
      {/* Controls */}
      {!bare && (
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        {devices.length > 1 && (
          <div role="group" aria-label={t("deviceLabel")} className="flex rounded-full bg-navy/5 p-1">
            {devices.map((d) => {
              const Icon = d === "phone" ? Smartphone : Laptop;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDevice(d)}
                  aria-pressed={device === d}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    device === d ? "bg-white text-navy shadow-sm" : "text-ink/65 hover:text-navy"
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {t(d)}
                </button>
              );
            })}
          </div>
        )}
        <button
          type="button"
          onClick={() => setReloadKey((k) => k + 1)}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink/70 hover:text-navy"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          {t("reset")}
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink/70 hover:text-navy"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          {t("fullscreen")}
        </a>
      </div>
      )}

      {/* Device, scaled to fit. The wrapper reserves the scaled size. */}
      <div ref={boxRef} className="w-full">
        <div className="relative mx-auto" style={{ width: natW * scale, height: natH * scale }}>
          {scale > 0 && (
            <div
              className="absolute start-0 top-0 origin-top-left rtl:origin-top-right"
              style={{ width: natW, height: natH, transform: `scale(${scale})` }}
              dir="ltr"
            >
              {device === "phone" ? (
                <IPhoneFrame>{frame}</IPhoneFrame>
              ) : (
                <div style={{ width: laptopW }}>
                  <div
                    className="relative mx-auto bg-[#16181d] shadow-[0_40px_80px_-30px_rgba(18,32,63,0.45)]"
                    style={{ padding: LAPTOP.bezel, borderRadius: "22px 22px 0 0", width: laptopW }}
                  >
                    <span aria-hidden="true" className="absolute start-1/2 top-[6px] size-[5px] -translate-x-1/2 rounded-full bg-[#2a2d33]" />
                    <div className="overflow-hidden rounded-[6px] bg-white">{frame}</div>
                  </div>
                  <div
                    aria-hidden="true"
                    className="relative mx-auto rounded-b-[18px] bg-gradient-to-b from-[#d9dade] to-[#b8bac0]"
                    style={{ height: LAPTOP.base, width: laptopW * 1.08, marginInlineStart: -laptopW * 0.04 }}
                  >
                    <span className="absolute start-1/2 top-0 h-[7px] w-[160px] -translate-x-1/2 rounded-b-[8px] bg-[#a9abb1]" />
                  </div>
                </div>
              )}
            </div>
          )}

          {blocked && scale > 0 && (
            <button
              type="button"
              onClick={() => setActivated(true)}
              className="absolute inset-0 z-10 flex items-center justify-center"
              aria-label={t("tapToTry")}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-lg">
                <Hand className="size-4" aria-hidden="true" />
                {t("tapToTry")}
              </span>
            </button>
          )}
        </div>
      </div>

      {badge && (
        <p className="mt-6 rounded-full bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-dark">
          {badge}
        </p>
      )}
    </div>
  );
}
