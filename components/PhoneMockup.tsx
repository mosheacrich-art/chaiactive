import Image from "next/image";

export default function PhoneMockup({
  src,
  alt,
  badge1,
  badge2,
  priority,
}: {
  src: string;
  alt: string;
  badge1?: string;
  badge2?: string;
  priority?: boolean;
}) {
  return (
    <div className="relative mx-auto w-[240px] rotate-3 sm:w-[280px]">
      <div className="overflow-hidden rounded-[2.75rem] border-[6px] border-navy-dark bg-navy-dark shadow-2xl shadow-navy/30">
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.25rem] bg-white">
          <div className="absolute inset-x-0 top-0 z-10 flex justify-center pt-2">
            <div className="h-5 w-24 rounded-full bg-navy-dark" />
          </div>
          <Image
            src={`/images/app/${src}`}
            alt={alt}
            fill
            priority={priority}
            sizes="280px"
            className="object-cover"
            style={{ objectPosition: "18% 12%" }}
          />
        </div>
      </div>

      {badge1 && (
        <div className="absolute -start-6 top-10 -rotate-3 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-navy shadow-lg shadow-navy/10 sm:-start-10">
          {badge1}
        </div>
      )}
      {badge2 && (
        <div className="absolute -end-6 bottom-16 rotate-2 rounded-xl bg-navy px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-navy/20 sm:-end-10">
          {badge2}
        </div>
      )}
    </div>
  );
}
