// Structural data for the success stories. Display text (reto, solución,
// resultado) lives in messages/*.json under `casos.items.<slug>`.
//
// How to add a case: add an entry here, add `casos.items.<slug>` to every
// messages/*.json, and drop its screenshots in public/images/casos/<slug>/.
// Only verifiable facts: no figures from the client's own marketing.
export type CasoConfig = {
  slug: "jabad" | "shevat" | "better-coffee" | "creative-favours" | "perashapp";
  url: string;
  line: "comunidades" | "empresas";
  logo?: string;
  // Paths relative to public/images/. Empty = labelled placeholder.
  screenshots: string[];
};

export const CASOS_CONFIG: CasoConfig[] = [
  {
    slug: "jabad",
    url: "https://bcnkehila.com",
    line: "comunidades",
    logo: "logos/jabad.png",
    screenshots: [
      "casos/jabad/inicio.png",
      "casos/jabad/calendario.png",
      "casos/jabad/eventos.png",
      "casos/jabad/mikve.png",
      "casos/jabad/donativos.png",
    ],
  },
  {
    slug: "shevat",
    url: "https://shevat.eu",
    line: "empresas",
    // TODO(imágenes): añadir capturas de promociones y del formulario por pasos.
    screenshots: ["casos/shevat/home.jpg"],
  },
  {
    slug: "better-coffee",
    url: "https://better-coffee.vercel.app",
    line: "empresas",
    // TODO(imágenes): añadir capturas del selector de sabor y de la lista de espera.
    screenshots: ["casos/better-coffee/home.jpg"],
  },
  {
    slug: "creative-favours",
    url: "https://creativefavours.vercel.app",
    line: "empresas",
    logo: "logos/creative-favours.png",
    screenshots: [
      "casos/creative-favours/landing.png",
      "casos/creative-favours/kippot-personalised.png",
      "casos/creative-favours/linen-colours.png",
      "casos/creative-favours/all-fabrics.png",
    ],
  },
  {
    slug: "perashapp",
    url: "https://perashapp.com",
    line: "empresas",
    logo: "logos/perashapp.png",
    screenshots: [
      "casos/perashapp/landing.png",
      "casos/perashapp/parashot-list.png",
      "casos/perashapp/torah-reading.png",
      "casos/perashapp/tikkun-korim.png",
    ],
  },
];
