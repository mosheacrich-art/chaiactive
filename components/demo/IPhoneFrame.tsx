import type { ReactNode } from "react";

// A drawn iPhone at real size (CSS px). Scale it from outside with a
// transform. `children` fill the screen area between the status bar and
// the home indicator: IPHONE.screenW × IPHONE.contentH.
export const IPHONE = {
  screenW: 393,
  screenH: 852,
  bezel: 13,
  status: 54,
  home: 30,
  get width() {
    return this.screenW + this.bezel * 2;
  },
  get height() {
    return this.screenH + this.bezel * 2;
  },
  get contentH() {
    return this.screenH - this.status - this.home;
  },
};

export default function IPhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative bg-[#16181d] shadow-[0_40px_80px_-30px_rgba(18,32,63,0.5)]"
      style={{ width: IPHONE.width, height: IPHONE.height, padding: IPHONE.bezel, borderRadius: 64 }}
      dir="ltr"
    >
      {/* Side buttons */}
      <span aria-hidden="true" className="absolute -left-[3px] top-[170px] h-[34px] w-[3px] rounded-l bg-[#2a2d33]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[230px] h-[62px] w-[3px] rounded-l bg-[#2a2d33]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[305px] h-[62px] w-[3px] rounded-l bg-[#2a2d33]" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[250px] h-[100px] w-[3px] rounded-r bg-[#2a2d33]" />
      <div className="relative h-full w-full overflow-hidden bg-white" style={{ borderRadius: 52 }}>
        {/* Status bar with Dynamic Island */}
        <div
          aria-hidden="true"
          className="relative flex items-center justify-between bg-white px-8 text-[15px] font-semibold text-black"
          style={{ height: IPHONE.status }}
        >
          <span>9:41</span>
          <span className="absolute left-1/2 top-[11px] h-[34px] w-[122px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1.5">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.5" width="3" height="9.5" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor"/><rect x="23" y="4" width="1.5" height="4" rx=".75" fill="currentColor" opacity=".4"/></svg>
          </span>
        </div>
        <div className="relative" style={{ width: IPHONE.screenW, height: IPHONE.contentH }}>
          {children}
        </div>
        {/* Home indicator */}
        <div aria-hidden="true" className="flex items-center justify-center bg-white" style={{ height: IPHONE.home }}>
          <span className="h-[5px] w-[134px] rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}
