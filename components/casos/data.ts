export type CasoConfig = {
  slug: string;
  logo: string;
  // TODO: swap for the real photo once provided; renders a placeholder until then.
  photoPending: boolean;
};

export const CASOS_CONFIG: CasoConfig[] = [
  { slug: "creative-favours", logo: "logos/creative-favours.png", photoPending: true },
  { slug: "perashapp", logo: "logos/perashapp.png", photoPending: true },
  { slug: "jabad", logo: "logos/jabad.png", photoPending: true },
];
