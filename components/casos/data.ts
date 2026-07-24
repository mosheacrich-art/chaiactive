export type CasoConfig = {
  slug: string;
  logo: string;
  // TODO: swap for the real photo once provided; renders a placeholder until then.
  photoPending: boolean;
  // Optional set of product screenshots shown as a small auto-advancing slideshow instead of a static photo.
  screenshots?: string[];
};

export const CASOS_CONFIG: CasoConfig[] = [
  {
    slug: "creative-favours",
    logo: "logos/creative-favours.png",
    photoPending: false,
    screenshots: [
      "casos/creative-favours/landing.png",
      "casos/creative-favours/kippot-personalised.png",
      "casos/creative-favours/linen-colours.png",
      "casos/creative-favours/all-fabrics.png",
    ],
  },
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
  {
    slug: "jabad",
    logo: "logos/jabad.png",
    photoPending: false,
    screenshots: [
      "casos/jabad/login.png",
      "casos/jabad/eventos.png",
      "casos/jabad/servicios.png",
      "casos/jabad/donativos.png",
      "casos/jabad/mikve.png",
    ],
  },
];
