export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[330px] sm:w-[360px]">
      <div className="overflow-hidden rounded-[2.75rem] border-[6px] border-navy-dark bg-navy-dark shadow-2xl shadow-navy/30">
        <div className="relative aspect-[360/780] w-full overflow-hidden rounded-[2.25rem] bg-cream">
          <div className="absolute inset-x-0 top-0 z-10 flex justify-center pt-2">
            <div className="h-5 w-24 rounded-full bg-navy-dark" />
          </div>
          <div className="flex h-full flex-col pt-8">{children}</div>
          <div className="pointer-events-none absolute inset-x-0 bottom-1.5 flex justify-center">
            <div className="h-1 w-28 rounded-full bg-navy/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
