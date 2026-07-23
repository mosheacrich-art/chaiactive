export type ServiceRowConfig = {
  slug: string;
  image: string;
  width: number;
  height: number;
};

// Structural data only (which image goes with which banner, in order).
// All display text lives in messages/*.json under `servicios.banners`,
// indexed to match this array 1:1. Paths are relative to /public/images/.
// width/height are each image's real pixel size, so it renders at its
// native aspect ratio (no cropping/stretching).
export const SERVICES_CONFIG: ServiceRowConfig[] = [
  { slug: "cover", image: "services/row-cover.png", width: 1536, height: 1024 },
  { slug: "donativos", image: "services/row-donativos.png", width: 1713, height: 918 },
  { slug: "calendario", image: "services/row-calendario.png", width: 1672, height: 941 },
  { slug: "miembros", image: "services/row-miembros.png", width: 1672, height: 941 },
  { slug: "mikve", image: "services/row-mikve.png", width: 1672, height: 941 },
  { slug: "servicios-comunitarios", image: "services/row-servicios-comunitarios.png", width: 1672, height: 941 },
  { slug: "eventos", image: "services/row-eventos.png", width: 1672, height: 941 },
  { slug: "jconnect", image: "app/kehal-jconnect.png", width: 2558, height: 1600 },
  { slug: "tora", image: "services/row-tora.png", width: 1672, height: 941 },
  { slug: "admin", image: "services/row-admin.png", width: 1625, height: 968 },
];
