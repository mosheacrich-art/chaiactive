import Image from "next/image";

export default function BrowserFrame({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-2xl shadow-navy/20">
      <div className="flex items-center gap-1.5 border-b border-navy/10 bg-cream-dark px-3 py-2">
        <span className="size-2.5 rounded-full bg-gold/60" />
        <span className="size-2.5 rounded-full bg-gold/40" />
        <span className="size-2.5 rounded-full bg-gold/20" />
      </div>
      <Image
        src={`/images/app/${src}`}
        alt={alt}
        width={1600}
        height={1000}
        priority={priority}
        className="h-auto w-full"
        sizes="(min-width: 1024px) 640px, 100vw"
      />
    </div>
  );
}
