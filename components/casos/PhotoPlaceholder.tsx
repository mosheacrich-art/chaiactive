import { ImageOff } from "lucide-react";

// TODO: replace with the real client photo once provided.
export default function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-navy/15 bg-cream text-navy/30">
      <ImageOff className="size-8" aria-hidden="true" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
