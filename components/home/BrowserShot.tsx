import Image from "next/image";

// A screenshot inside a minimal browser window. Uses the shared `shot`
// radius/shadow so every capture on the site looks the same.
export default function BrowserShot({
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  label,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <figure className={`shot bg-white ring-1 ring-navy/10 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-navy/10 bg-cream px-3 py-2" aria-hidden="true">
        <span className="size-2 rounded-full bg-navy/15" />
        <span className="size-2 rounded-full bg-navy/15" />
        <span className="size-2 rounded-full bg-navy/15" />
        {label && (
          <span className="ms-2 truncate rounded-full bg-white px-3 py-0.5 text-[10px] font-medium text-ink/65" dir="ltr">
            {label}
          </span>
        )}
      </div>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className="h-auto w-full" />
    </figure>
  );
}
