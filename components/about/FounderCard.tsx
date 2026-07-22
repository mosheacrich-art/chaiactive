"use client";

import { useState } from "react";
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
  const [expanded, setExpanded] = useState(false);

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  const photo = photoSrc ? (
    <Image
      src={photoSrc}
      alt={name}
      width={128}
      height={128}
      className="size-28 shrink-0 rounded-full object-cover"
    />
  ) : (
    <div className="flex size-28 shrink-0 items-center justify-center rounded-full bg-navy text-3xl font-bold text-white">
      {initials}
    </div>
  );

  return (
    <button
      type="button"
      onClick={() => setExpanded((v) => !v)}
      aria-expanded={expanded}
      className="group flex w-full flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center transition hover:bg-white/80"
    >
      {photo}
      <div>
        <p className="text-lg font-bold text-navy">{name}</p>
        <p className="mt-1 text-sm text-ink/60">{role}</p>
      </div>
      <p
        className={`text-base italic leading-relaxed text-navy/80 md:group-hover:line-clamp-none ${
          expanded ? "line-clamp-none" : "line-clamp-2"
        }`}
      >
        &ldquo;{quote}&rdquo;
      </p>
    </button>
  );
}
