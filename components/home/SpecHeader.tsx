// Shared head for the plain, technical sections (Tecnología, Seguridad):
// a big tight sans headline, the explanation beside it, and a hairline rule
// with a gold lead-in and a row of fading ticks.
export default function SpecHeader({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-royal">{eyebrow}</p>
      <div className="mt-4 grid items-end gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <h2
          id={id}
          className="text-4xl font-extrabold leading-[0.98] text-navy sm:text-5xl lg:text-6xl"
        >
          {title}
        </h2>
        <p className="max-w-md text-lg leading-relaxed text-ink/70">{intro}</p>
      </div>
      <div aria-hidden="true" className="mt-10 flex items-center gap-4">
        <span className="h-[3px] w-16 bg-royal" />
        <span className="h-px flex-1 bg-navy/15" />
        <span className="flex gap-1.5">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="size-1.5 bg-royal" style={{ opacity: 1 - i / 12 }} />
          ))}
        </span>
      </div>
    </>
  );
}
