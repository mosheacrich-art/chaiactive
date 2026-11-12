"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Check, Droplet, Home, Leaf, MapPin, MessageCircle, Search, Stamp, TriangleAlert } from "lucide-react";

// Recreation of the Kashrut FCJE app (repo mosheacrich-art/kosher) drawn in
// code, NOT a screenshot. It copies the app's real layout, colours and copy,
// and every product and business shown is a real entry of its catalogue
// (server/data/*.json, 2026-11). Product photos, category icons and business
// banners are the app's own images, in public/images/kashrut/. The app only exists in Spanish, so the
// screen stays in Spanish on every locale; only the label under it changes.

const BRAND = "#0f5c4c";

const TABS = [
  { key: "inicio", label: "Inicio", Icon: Home },
  { key: "mapa", label: "Mapa", Icon: MapPin },
  { key: "buscar", label: "Buscar", Icon: Search },
  { key: "asistente", label: "Asistente", Icon: MessageCircle },
] as const;

type TabKey = (typeof TABS)[number]["key"];

type Estatus = "pareve" | "lacteo";
type Sello = "apto_sin_sello" | "requiere_sello" | "planta_especifica";
type Producto = { id: string; marca: string; nombre: string; categoria: string; estatus: Estatus; sello: Sello; tiendas: string };

const IMG = "/images/kashrut";

// Real entries of the catalogue, by id.
const ACEITES: Producto[] = [
  { id: "p343", marca: "Borges", nombre: "Aceite de oliva virgen extra", categoria: "Aceites", estatus: "pareve", sello: "apto_sin_sello", tiendas: "Carrefour, Alcampo, Mercadona" },
  { id: "p352", marca: "La Española", nombre: "Aceite de oliva suave", categoria: "Aceites", estatus: "pareve", sello: "apto_sin_sello", tiendas: "Carrefour, Alcampo, Mercadona" },
  { id: "p355", marca: "Manzano", nombre: "Aceite de oliva virgen extra", categoria: "Aceites", estatus: "pareve", sello: "requiere_sello", tiendas: "Carrefour" },
  { id: "p356", marca: "Francisco Gomez", nombre: "Aceite de oliva virgen extra", categoria: "Aceites", estatus: "pareve", sello: "planta_especifica", tiendas: "" },
];
const DESTACADOS: Producto[] = [
  { id: "p316", marca: "Kit Kat", nombre: "Barrita de chocolate", categoria: "Chocolates", estatus: "lacteo", sello: "requiere_sello", tiendas: "Carrefour, Alcampo" },
  { id: "p72", marca: "Almendrola", nombre: "Leche de almendra", categoria: "Leche Páreve", estatus: "pareve", sello: "requiere_sello", tiendas: "Carrefour, Alcampo" },
];

const CATEGORIAS = [
  { name: "Aceites", icon: "aceites" },
  { name: "Chocolates", icon: "chocolates" },
  { name: "Conservas", icon: "conservas" },
  { name: "Leche Páreve", icon: "leche-pareve" },
];

// Businesses with a promotional banner go first on the app's home screen.
const BANNERS = [
  { id: "neg-6", nombre: "Kosher Sefarad" },
  { id: "neg-7", nombre: "Gourmet Kosher" },
  { id: "neg-5", nombre: "Herzl Coffee & Market" },
];

const NEGOCIOS = [
  { nombre: "Rimmon", tipo: "Restaurante", sub: "Jalaví / Lácteo", dir: "C/ Viriato 37", emoji: "🍽️" },
  { nombre: "Fuego Steakhouse", tipo: "Restaurante", sub: "Basarí / Cárnico", dir: "C/ San Lorenzo 9", emoji: "🍽️" },
  { nombre: "Kosher Sefarad", tipo: "Punto de venta", sub: "Tiendas Madrid", dir: "C/ Viriato 35", emoji: "🛒" },
  { nombre: "Gourmet Kosher", tipo: "Punto de venta", sub: "Tiendas Madrid", dir: "C/ Añastro, 9", emoji: "🛒" },
];

const SUGERENCIAS = [
  "¿Cómo hago una paella 100% kosher?",
  "¿El jamón es kosher?",
  "Quiero hacer un cocido kosher, ¿qué compro?",
  "¿Necesito sello para el aceite de oliva?",
];

export default function KashrutMockup() {
  const t = useTranslations("kashrut.app");
  const [tab, setTab] = useState<TabKey>("inicio");
  const reduceMotion = useReducedMotion();

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const dir = event.key === "ArrowRight" ? 1 : -1;
    const i = TABS.findIndex((x) => x.key === tab);
    const next = TABS[(i + dir + TABS.length) % TABS.length].key;
    setTab(next);
    document.getElementById(`kashrut-tab-${next}`)?.focus();
  }

  return (
    <div className="flex flex-col items-center">
      <div
        dir="ltr"
        lang="es"
        className="relative flex h-[600px] w-[300px] flex-col overflow-hidden rounded-[2.75rem] border-[10px] border-navy-dark bg-[#fafafa] shadow-2xl shadow-navy/25"
      >
        <div className="mx-auto mt-2 h-5 w-24 rounded-full bg-navy-dark" aria-hidden="true" />

        <div className="flex items-center gap-2 border-b border-neutral-200 bg-white px-4 pb-2 pt-1.5">
          <span className="flex size-7 items-center justify-center rounded-full text-white" style={{ background: BRAND }}>
            <BadgeCheck className="size-4" aria-hidden="true" />
          </span>
          <span className="text-sm font-bold tracking-tight text-[#1a1a1a]">Kashrut FCJE</span>
        </div>

        <div
          id={`kashrut-panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`kashrut-tab-${tab}`}
          className="relative flex-1 overflow-y-auto px-3.5 pb-20 pt-3"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.25 } }}
              exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.15 } }}
            >
              {tab === "inicio" && <Inicio />}
              {tab === "mapa" && <Mapa />}
              {tab === "buscar" && <Buscar />}
              {tab === "asistente" && <Asistente />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating capsule nav, as in the app: "Buscar" is the wide pill. */}
        <div
          role="tablist"
          aria-label={t("tablist")}
          onKeyDown={onKeyDown}
          className="absolute inset-x-3 bottom-3 flex items-center gap-1 rounded-full border border-neutral-100 bg-white px-1.5 py-1 shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
        >
          {TABS.map(({ key, label, Icon }) => {
            const active = key === tab;
            const wide = key === "buscar";
            return (
              <button
                key={key}
                id={`kashrut-tab-${key}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`kashrut-panel-${key}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setTab(key)}
                className={
                  wide
                    ? `flex flex-[1.5] items-center justify-center gap-1 rounded-full px-2 py-2 text-xs font-semibold ${active ? "text-white" : "bg-neutral-100 text-[#1a1a1a]"}`
                    : `flex flex-1 flex-col items-center gap-0.5 rounded-full py-1 text-[10px] font-medium ${active ? "" : "text-[#6b6b6b]"}`
                }
                style={wide && active ? { background: BRAND } : !wide && active ? { color: BRAND } : undefined}
              >
                <Icon className={wide ? "size-4" : "size-4.5"} aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-4 max-w-[300px] rounded-full bg-gold/15 px-4 py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-gold-dark">
        {t("label")}
      </p>
    </div>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <p className="text-[13px] font-bold text-[#1a1a1a]">{children}</p>;
}

function SearchPill({ value }: { value?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-3.5 py-2">
      <Search className="size-3.5 shrink-0 text-[#6b6b6b]" aria-hidden="true" />
      <span className={`text-[11px] ${value ? "text-[#1a1a1a]" : "text-[#6b6b6b]"}`}>
        {value ?? "Buscar aceites, ahumados, conservas..."}
      </span>
    </div>
  );
}

const ESTATUS = {
  pareve: { label: "Páreve", cls: "bg-[#eef1f4] text-[#4a5568]", Icon: Leaf },
  lacteo: { label: "Lácteo", cls: "bg-[#e7f0f5] text-[#2f6690]", Icon: Droplet },
} as const;
const SELLO = {
  apto_sin_sello: { label: "Apto incluso sin sello", cls: "bg-[#e6f4ec] text-[#1e7a4c]", Icon: Check },
  requiere_sello: { label: "Requiere sello", cls: "bg-[#fcefd8] text-[#b5791c]", Icon: Stamp },
  planta_especifica: { label: "Solo de planta específica", cls: "bg-[#fbe7e4] text-[#b23a2e]", Icon: TriangleAlert },
} as const;

function Badge({ cls, Icon, children }: { cls: string; Icon: typeof Check; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-medium ${cls}`}>
      <Icon className="size-2.5 shrink-0" aria-hidden="true" />
      {children}
    </span>
  );
}

function ProductPhoto({ p, className }: { p: Producto; className: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-white ${className}`}>
      <Image src={`${IMG}/${p.id}.png`} alt={`${p.marca} ${p.nombre}`} fill sizes="120px" className="object-contain p-1" />
    </div>
  );
}

function Badges({ p }: { p: Producto }) {
  const e = ESTATUS[p.estatus];
  const s = SELLO[p.sello];
  return (
    <div className="flex flex-wrap gap-1">
      <Badge cls={e.cls} Icon={e.Icon}>{e.label}</Badge>
      <Badge cls={s.cls} Icon={s.Icon}>{s.label}</Badge>
    </div>
  );
}

function Inicio() {
  return (
    <div className="space-y-4">
      <SearchPill />
      <div>
        <Heading>Categorías</Heading>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {CATEGORIAS.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-1 rounded-xl border border-neutral-200 bg-white px-1 py-2">
              <Image src={`${IMG}/cat-${c.icon}.png`} alt="" width={32} height={32} className="size-8" />
              <span className="text-center text-[9px] leading-tight text-[#1a1a1a]">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Heading>Dónde comer y comprar kosher</Heading>
        <div className="-mx-3.5 mt-2 flex gap-2 overflow-hidden px-3.5">
          {BANNERS.map((b) => (
            <div key={b.id} className="w-[210px] shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <Image src={`${IMG}/${b.id}.jpg`} alt={b.nombre} width={600} height={300} sizes="210px" className="h-auto w-full" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Heading>Explora el catálogo</Heading>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {DESTACADOS.map((p) => (
            <div key={p.nombre} className="flex flex-col gap-1.5 rounded-xl border border-neutral-200 bg-white p-2">
              <ProductPhoto p={p} className="h-16" />
              <div>
                <p className="text-[9px] text-[#6b6b6b]">{p.marca}</p>
                <p className="line-clamp-2 text-[11px] font-semibold leading-tight text-[#1a1a1a]">{p.nombre}</p>
              </div>
              <Badges p={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Buscar() {
  return (
    <div className="space-y-3">
      <SearchPill value="aceite" />
      <div className="flex gap-1.5">
        {["Aceites", "Páreve", "Todos los sellos"].map((f, i) => (
          <span
            key={f}
            className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${i === 0 ? "border-transparent text-white" : "border-neutral-200 bg-white text-[#1a1a1a]"}`}
            style={i === 0 ? { background: BRAND } : undefined}
          >
            {f}
          </span>
        ))}
      </div>
      <p className="text-[10px] text-[#6b6b6b]">16 productos</p>
      {ACEITES.map((p) => (
        <div key={p.marca} className="flex gap-2.5 rounded-xl border border-neutral-200 bg-white p-2.5">
          <ProductPhoto p={p} className="size-12 shrink-0" />
          <div className="min-w-0 space-y-1">
            <div>
              <p className="text-[9px] uppercase tracking-wide text-[#6b6b6b]">{p.marca}</p>
              <p className="truncate text-[11px] font-semibold text-[#1a1a1a]">{p.nombre}</p>
            </div>
            <Badges p={p} />
            {p.tiendas && <p className="truncate text-[9px] text-[#6b6b6b]">{p.tiendas}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function Asistente() {
  return (
    <div className="space-y-3">
      <p className="text-[15px] font-bold text-[#1a1a1a]">Asistente Kosher</p>
      <div className="max-w-[92%] space-y-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2.5 text-[11px] leading-snug text-[#1a1a1a]">
        <p>Hola, soy tu asistente kosher.</p>
        <p>
          Pregúntame si un producto es kosher, o pídeme una receta (ej. &quot;cómo hago una paella kosher&quot;) y te diré qué
          ingredientes comprar, cuáles necesitan sello y con qué marcas reales de Madrid.
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5 pt-1">
        {SUGERENCIAS.map((s) => (
          <span key={s} className="rounded-full border px-2.5 py-1 text-[10px] font-medium" style={{ borderColor: BRAND, color: BRAND }}>
            {s}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2">
        <span className="flex-1 text-[11px] text-[#6b6b6b]">Escribe tu pregunta…</span>
        <span className="flex size-6 items-center justify-center rounded-full text-white" style={{ background: BRAND }}>
          <MessageCircle className="size-3" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

// Stylised street map: the real app uses Leaflet + OpenStreetMap tiles.
function Mapa() {
  const pins = [
    { x: 38, y: 34 },
    { x: 41, y: 38 },
    { x: 66, y: 22 },
    { x: 54, y: 62 },
  ];
  return (
    <div className="space-y-3">
      <div className="flex gap-1.5">
        {["Todos", "Restaurantes", "Tiendas", "Catering"].map((f, i) => (
          <span
            key={f}
            className={`rounded-full border px-2 py-1 text-[9px] font-medium ${i === 0 ? "border-transparent text-white" : "border-neutral-200 bg-white text-[#1a1a1a]"}`}
            style={i === 0 ? { background: BRAND } : undefined}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="relative h-36 overflow-hidden rounded-xl border border-neutral-200 bg-[#eef0ea]" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <g stroke="#ffffff" strokeWidth="3" fill="none">
            <path d="M0 30 L100 22" />
            <path d="M0 70 L100 58" />
            <path d="M28 0 L36 100" />
            <path d="M70 0 L62 100" />
          </g>
          <g stroke="#ffffff" strokeWidth="1.2" fill="none">
            <path d="M0 48 L100 42" />
            <path d="M48 0 L52 100" />
            <path d="M0 88 L100 80" />
            <path d="M12 0 L18 100" />
            <path d="M86 0 L82 100" />
          </g>
          <rect x="74" y="64" width="20" height="14" fill="#d7e6d2" />
        </svg>
        {pins.map((p, i) => (
          <span key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <MapPin className="size-5 drop-shadow" style={{ color: BRAND, fill: "#ffffff" }} />
          </span>
        ))}
      </div>
      {NEGOCIOS.map((n) => (
        <div key={n.nombre} className="flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white p-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg text-base" style={{ background: "#e7efec" }} aria-hidden="true">
            {n.emoji}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-[#1a1a1a]">{n.nombre}</p>
            <p className="truncate text-[9px] text-[#6b6b6b]">
              {n.tipo} · {n.sub}
            </p>
            <p className="truncate text-[9px] text-[#6b6b6b]">{n.dir}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
