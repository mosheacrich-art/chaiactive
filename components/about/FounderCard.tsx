import Image from "next/image";

// Renders an initials avatar when `photoSrc` is omitted, so the card still
// works before a photo is available.
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
      width={160}
      height={160}
      className="size-36 rounded-full object-cover sm:size-40"
    />
  ) : (
    <div className="flex size-36 items-center justify-center rounded-full bg-navy text-4xl font-bold text-white sm:size-40">
      {initials}
    </div>
  );

  return (
    <div className="rounded-3xl bg-white p-10">
      {/* Desktop: hover crossfades from photo/name to the quote */}
      <div className="group relative hidden h-80 md:block">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center transition-opacity duration-300 group-hover:opacity-0">
          {photo}
          <div>
            <p className="text-xl font-bold text-navy">{name}</p>
            <p className="mt-1 text-base text-ink/60">{role}</p>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-xl italic leading-relaxed text-navy">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Mobile / touch: everything visible at once, no hover required */}
      <div className="flex flex-col items-center gap-4 text-center md:hidden">
        {photo}
        <div>
          <p className="text-xl font-bold text-navy">{name}</p>
          <p className="mt-1 text-base text-ink/60">{role}</p>
        </div>
        <p className="mt-2 text-lg italic leading-relaxed text-navy/80">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    </div>
  );
}
