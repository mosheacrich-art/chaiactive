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
    <div className="shot">
      <Image
        src={`/images/app/${src}`}
        alt={alt}
        width={1600}
        height={1000}
        priority={priority}
        className="h-auto w-full"
        sizes="(min-width: 1024px) 420px, 100vw"
      />
    </div>
  );
}
