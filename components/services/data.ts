export type ServiceRowConfig = {
  slug: string;
  image: string;
};

// Structural data only (which image goes with which banner, in order).
// All display text lives in messages/*.json under `servicios.banners`,
// indexed to match this array 1:1. Paths are relative to /public/images/.
export const SERVICES_CONFIG: ServiceRowConfig[] = [
  { slug: "cover", image: "services/row-cover.png" },
  { slug: "donativos", image: "services/row-donativos.png" },
  { slug: "calendario", image: "services/row-calendario.png" },
  { slug: "miembros", image: "services/row-miembros.png" },
  { slug: "mikve", image: "services/row-mikve.png" },
  { slug: "servicios-comunitarios", image: "services/row-servicios-comunitarios.png" },
  { slug: "eventos", image: "services/row-eventos.png" },
  { slug: "jconnect", image: "app/kehal-jconnect.png" },
  { slug: "tora", image: "services/row-tora.png" },
  { slug: "admin", image: "services/row-admin.png" },
];
