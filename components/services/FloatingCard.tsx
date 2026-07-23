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
  return (
    <motion.div
      variants={cardVariants}
      className="w-full max-w-[220px] rounded-2xl bg-white p-4 shadow-lg shadow-navy/5"
    >
      <div className="flex size-9 items-center justify-center rounded-full bg-cream">
        <Icon className="size-4 text-navy" aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm font-bold text-navy">{title}</p>
      {value && <p className="mt-0.5 text-lg font-bold text-gold">{value}</p>}
      {note && <p className="mt-1 text-xs leading-snug text-ink/50">{note}</p>}
    </motion.div>
  );
}
