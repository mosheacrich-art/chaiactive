export type CasoConfig = {
  slug: string;
  logo: string;
  // TODO: swap for the real photo once provided; renders a placeholder until then.
  photoPending: boolean;
  // Optional set of product screenshots shown as a small auto-advancing slideshow instead of a static photo.
  screenshots?: string[];
};

export const CASOS_CONFIG: CasoConfig[] = [
  { slug: "creative-favours", logo: "logos/creative-favours.png", photoPending: true },
  {
    slug: "perashapp",
    logo: "logos/perashapp.png",
    photoPending: false,
    screenshots: [
      "casos/perashapp/landing.png",
      "casos/perashapp/parashot-list.png",
      "casos/perashapp/torah-reading.png",
      "casos/perashapp/tikkun-korim.png",
    ],
  },
  { slug: "jabad", logo: "logos/jabad.png", photoPending: true },
];
