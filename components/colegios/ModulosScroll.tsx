"use client";

import { useTranslations } from "next-intl";
import { CalendarClock, ClipboardCheck, FileUser, GraduationCap, MessagesSquare, NotebookPen, UsersRound } from "lucide-react";
import ModuleExplorer from "@/components/demo/ModuleExplorer";

// The school app's modules, each with its real screen from the live demo
// (public/images/modulos-colegio, captured with the matching profile:
// student, teacher or family). Order matches `colegios.modulos.items`.
const MODULES = [
  { icon: NotebookPen, shot: "tareas" },
  { icon: GraduationCap, shot: "notas" },
  { icon: ClipboardCheck, shot: "asistencia" },
  { icon: CalendarClock, shot: "horario" },
  { icon: MessagesSquare, shot: "comunicacion" },
  { icon: FileUser, shot: "ficha" },
  { icon: UsersRound, shot: "familias" },
];

type Item = { title: string; points: string[] };

export default function ModulosScroll() {
  const t = useTranslations("colegios.modulos");
  const items = t.raw("items") as Item[];
  return (
    <ModuleExplorer
      id="modulos"
      title={t("title")}
      intro={t("intro")}
      modules={MODULES.map((m, i) => ({ icon: m.icon, src: `/images/modulos-colegio/${m.shot}.jpg`, ...items[i] }))}
    />
  );
}
