"use client";

import { useLocale } from "next-intl";
import IPhoneFrame, { IPHONE } from "@/components/demo/IPhoneFrame";
import { isRtl } from "@/i18n/routing";

// The contact form inside the same drawn iPhone as the home hero (status bar,
// Dynamic Island, side buttons, home indicator). Real size from sm up;
// scaled to 360px wide on phones. The screen scrolls if the form is taller.
const SMALL = 360 / IPHONE.width;

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  return (
    <div
      className="relative mx-auto h-[var(--h-sm)] w-[var(--w-sm)] sm:h-[var(--h)] sm:w-[var(--w)]"
      style={
        {
          "--w": `${IPHONE.width}px`,
          "--h": `${IPHONE.height}px`,
          "--w-sm": `${IPHONE.width * SMALL}px`,
          "--h-sm": `${IPHONE.height * SMALL}px`,
        } as React.CSSProperties
      }
    >
      <div className="absolute left-0 top-0 origin-top-left scale-[var(--s)] sm:scale-100" style={{ "--s": SMALL } as React.CSSProperties}>
        <IPhoneFrame>
          <div dir={isRtl(locale) ? "rtl" : "ltr"} className="h-full overflow-y-auto overscroll-contain bg-haze pt-2">
            {children}
          </div>
        </IPhoneFrame>
      </div>
    </div>
  );
}
