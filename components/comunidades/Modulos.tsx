"use client";

import { useTranslations } from "next-intl";
import {
  BookOpen,
  Briefcase,
  CalendarDays,
  Droplets,
  HandHeart,
  LayoutDashboard,
  Sparkles,
  Ticket,
  UserCheck,
} from "lucide-react";
import ModuleExplorer from "@/components/demo/ModuleExplorer";

// The nine Kehál modules, each with its real screen from the live demo
// (public/images/modulos). Order matches `comunidades.modulos.items`.
const MODULES = [
  { icon: UserCheck, shot: "membresia" },
  { icon: CalendarDays, shot: "calendario" },
  { icon: Ticket, shot: "eventos" },
  { icon: Droplets, shot: "mikve" },
  { icon: HandHeart, shot: "donativos" },
  { icon: Sparkles, shot: "ciclo" },
  { icon: BookOpen, shot: "tora" },
  { icon: Briefcase, shot: "jconnect" },
  { icon: LayoutDashboard, shot: "admin" },
];

type Item = { title: string; body: string };

export default function Modulos() {
  const t = useTranslations("comunidades.modulos");
  const items = t.raw("items") as Item[];
  return (
    <ModuleExplorer
      id="modulos"
      title={t("title")}
      intro={t("intro")}
      modules={MODULES.map((m, i) => ({ icon: m.icon, src: `/images/modulos/${m.shot}.jpg`, ...items[i] }))}
    />
  );
}
