"use client";

export default function ServicesProgressNav({
  items,
  activeIndex,
  visible,
}: {
  items: { id: string; number: string; label: string }[];
  activeIndex: number;
  visible: boolean;
}) {
  return (
    <nav
      aria-label="Servicios"
      className={`fixed top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 transition-opacity duration-300 lg:flex ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      } end-4 xl:end-6`}
    >
      {items.map((item, i) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="group flex items-center gap-2"
          aria-current={i === activeIndex ? "true" : undefined}
        >
          <span
            className={`text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100 ${
              i === activeIndex ? "text-navy" : "text-ink/50"
            }`}
          >
            {item.label}
          </span>
          <span
            className={`rounded-full transition-all ${
              i === activeIndex
                ? "h-2.5 w-2.5 bg-gold"
                : "h-1.5 w-1.5 bg-navy/20 group-hover:bg-navy/40"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
