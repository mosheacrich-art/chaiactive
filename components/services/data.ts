export type LocaleImage = { src: string; width: number; height: number };

export type ServiceRowConfig = {
  slug: string;
  // `es` is required and used as the fallback for any locale without its
  // own banner yet (see components/services/ServiceRow usage).
  images: {
    es: LocaleImage;
    en?: LocaleImage;
    fr?: LocaleImage;
    he?: LocaleImage;
  };
};

// Structural data only (which image goes with which banner, in order, per
// locale). All display text lives in messages/*.json under
// `servicios.banners`, indexed to match this array 1:1. Paths are relative
// to /public/images/. width/height are each image's real pixel size, so it
// renders at its native aspect ratio (no cropping/stretching).
export const SERVICES_CONFIG: ServiceRowConfig[] = [
  {
    slug: "cover",
    images: {
      es: { src: "services/row-cover.png", width: 1536, height: 1024 },
      en: { src: "services/row-cover-en.png", width: 1536, height: 1024 },
      he: { src: "services/row-cover-he.png", width: 1536, height: 1024 },
    },
  },
  {
    slug: "donativos",
    images: {
      es: { src: "services/row-donativos.png", width: 1713, height: 918 },
      en: { src: "services/row-donativos-en.png", width: 1536, height: 1024 },
      he: { src: "services/row-donativos-he.png", width: 1715, height: 917 },
    },
  },
  {
    slug: "calendario",
    images: {
      es: { src: "services/row-calendario.png", width: 1672, height: 941 },
      en: { src: "services/row-calendario-en.png", width: 1671, height: 941 },
      he: { src: "services/row-calendario-he.png", width: 1672, height: 941 },
    },
  },
  {
    slug: "miembros",
    images: {
      es: { src: "services/row-miembros.png", width: 1672, height: 941 },
      en: { src: "services/row-miembros-en.png", width: 1670, height: 941 },
      he: { src: "services/row-miembros-he.png", width: 1672, height: 941 },
    },
  },
  {
    slug: "mikve",
    images: {
      es: { src: "services/row-mikve.png", width: 1672, height: 941 },
      en: { src: "services/row-mikve-en.png", width: 1672, height: 941 },
      he: { src: "services/row-mikve-he.png", width: 1672, height: 941 },
    },
  },
  {
    slug: "servicios-comunitarios",
    images: {
      es: { src: "services/row-servicios-comunitarios.png", width: 1672, height: 941 },
      en: { src: "services/row-servicios-comunitarios-en.png", width: 1672, height: 941 },
      he: { src: "services/row-servicios-comunitarios-he.png", width: 1672, height: 941 },
    },
  },
  {
    slug: "eventos",
    images: {
      es: { src: "services/row-eventos.png", width: 1672, height: 941 },
      en: { src: "services/row-eventos-en.png", width: 1672, height: 941 },
      he: { src: "services/row-eventos-he.png", width: 1672, height: 941 },
    },
  },
  {
    slug: "jconnect",
    images: {
      es: { src: "services/row-jconnect.png", width: 1672, height: 941 },
      en: { src: "services/row-jconnect-en.png", width: 1672, height: 941 },
    },
  },
  {
    slug: "tora",
    images: {
      es: { src: "services/row-tora.png", width: 1672, height: 941 },
      en: { src: "services/row-tora-en.png", width: 1672, height: 941 },
      he: { src: "services/row-tora-he.png", width: 1672, height: 941 },
    },
  },
  {
    slug: "admin",
    images: {
      es: { src: "services/row-admin.png", width: 1625, height: 968 },
      en: { src: "services/row-admin-en.png", width: 1620, height: 971 },
      he: { src: "services/row-admin-he.png", width: 1624, height: 968 },
    },
  },
];
