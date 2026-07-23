import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type ServiceCardData = {
  title: string;
  value?: string;
  note?: string;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function FloatingCard({
  icon: Icon,
  title,
  value,
  note,
}: ServiceCardData & { icon: LucideIcon }) {
  const valueColor = value?.includes("€") ? "text-emerald-600" : "text-gold";

  return (
    <motion.div
      variants={cardVariants}
      className="relative w-full max-w-[210px] rounded-2xl bg-white p-4 shadow-lg shadow-navy/10"
    >
      <span className="absolute end-3 top-3 size-1.5 rounded-full bg-gold" aria-hidden="true" />
      <div className="flex size-10 items-center justify-center rounded-full bg-cream">
        <Icon className="size-5 text-navy" aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm font-bold text-navy">{title}</p>
      {value && <p className={`mt-0.5 text-xl font-bold ${valueColor}`}>{value}</p>}
      {note && <p className="mt-1 text-xs leading-snug text-ink/50">{note}</p>}
    </motion.div>
  );
}
