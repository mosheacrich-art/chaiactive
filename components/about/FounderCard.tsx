import Image from "next/image";

// TODO: replace with real founder photos. Pass `photoSrc` (a path under
// /public) once available; until then we render an initials placeholder.
export default function FounderCard({
  name,
  role,
  quote,
  photoSrc,
}: {
  name: string;
  role: string;
  quote: string;
  photoSrc?: string;
}) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  const photo = photoSrc ? (
    <Image
      src={photoSrc}
      alt={name}
      width={96}
      height={96}
      className="size-24 rounded-full object-cover"
    />
  ) : (
    <div className="flex size-24 items-center justify-center rounded-full bg-navy text-2xl font-bold text-white">
      {initials}
    </div>
  );

  return (
    <div className="rounded-3xl bg-cream p-8">
      {/* Desktop: hover crossfades from photo/name to the quote */}
      <div className="group relative hidden h-64 md:block">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center transition-opacity duration-300 group-hover:opacity-0">
          {photo}
          <div>
            <p className="font-bold text-navy">{name}</p>
            <p className="mt-1 text-sm text-ink/60">{role}</p>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-lg italic leading-relaxed text-navy">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Mobile / touch: everything visible at once, no hover required */}
      <div className="flex flex-col items-center gap-3 text-center md:hidden">
        {photo}
        <div>
          <p className="font-bold text-navy">{name}</p>
          <p className="mt-1 text-sm text-ink/60">{role}</p>
        </div>
        <p className="mt-2 text-base italic leading-relaxed text-navy/80">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    </div>
  );
}
