# Chai Active: web corporativa

Web de Chai Active (Barcelona), empresa de tecnología con raíces judías que trabaja en tres líneas: **comunidades** (Kehál), **colegios** (app escolar en diseño, buscamos pilotos) y **empresas** (transformación digital a medida).

Next.js 16 (App Router) · Tailwind CSS v4 · next-intl (es/en/he/fr, RTL) · Framer Motion · Resend · Vercel.

## Empezar

```bash
npm install
cp .env.example .env.local   # y rellena las variables
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El castellano es el idioma por defecto y vive sin prefijo; el resto en `/en`, `/he`, `/fr`.

## Rutas

| Ruta interna | es | en | fr | he |
| --- | --- | --- | --- | --- |
| `/` | `/` | `/en` | `/fr` | `/he` |
| `/comunidades` | `/comunidades` | `/en/communities` | `/fr/communautes` | `/he/comunidades` |
| `/colegios` | `/colegios` | `/en/schools` | `/fr/ecoles` | `/he/colegios` |
| `/empresas` | `/empresas` | `/en/business` | `/fr/entreprises` | `/he/empresas` |
| `/aviso-legal`, `/privacidad`, `/cookies` | igual en todos los idiomas, con su prefijo | | | |

Los slugs están en `i18n/routing.ts` (`pathnames`). El hebreo usa los slugs en castellano a propósito: las URLs con caracteres hebreos se vuelven ilegibles al compartirlas.

`/sitemap.xml` y `/robots.txt` se generan desde `app/sitemap.ts` y `app/robots.ts`.

## Estructura

- `app/[locale]/`: páginas (home, `comunidades`, `colegios`, `empresas` y las tres legales)
- `app/api/contact/`: endpoint del formulario (Resend)
- `components/layout/`: marco común (`PageShell`, `PageHero`, `CtaBand`, botones)
- `components/home/`, `comunidades/`, `colegios/`, `empresas/`: secciones de cada página
- `components/casos/`: casos de éxito (`data.ts`) y testimonios
- `lib/contact.ts`: canales de contacto y opciones de "¿Qué te interesa?"
- `lib/seo.ts`: metadata por página (canonical, hreflang, Open Graph)
- `messages/{locale}.json`: todos los textos
- `proxy.ts`: enrutado de idioma de next-intl y redirección 308 de `*.vercel.app` (solo producción) a `chaiactive.com`. En Next.js 16 `middleware.ts` pasa a llamarse `proxy.ts`.

## Variables de entorno

| Variable | Para qué |
| --- | --- |
| `RESEND_API_KEY` | Envío del formulario. Sin ella, el formulario responde con un error controlado. |
| `CONTACT_TO_EMAIL` | Bandeja que recibe los mensajes. Por defecto `jactive@gmail.com`. |
| `RESEND_FROM` | Remitente. Vacío = `onboarding@resend.dev` (pruebas de Resend). |
| `NEXT_PUBLIC_WHATSAPP_URL` | Enlace `https://wa.me/34…`. Vacío = no se muestra WhatsApp en la web. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email público visible en la web. |
| `NEXT_PUBLIC_SITE_URL` | URL canónica. Por defecto `https://www.chaiactive.com`. |

Las `NEXT_PUBLIC_*` se incrustan al compilar: tras cambiarlas en Vercel hay que volver a desplegar.

### Resend: verificar el dominio

Hoy el remitente es `onboarding@resend.dev`, que solo entrega a la cuenta dueña de Resend. Para enviar como `@chaiactive.com`:

1. En Resend → Domains, añade `chaiactive.com` y crea en el DNS los registros que indique (SPF, DKIM y, opcional, DMARC).
2. Cuando aparezca como *Verified*, define en Vercel `RESEND_FROM="Chai Active <hola@chaiactive.com>"` y vuelve a desplegar.

## Demos interactivas (iPhone / portátil)

`components/demo/DeviceDemo.tsx` muestra una demo real dentro de un iPhone o un portátil dibujados, como el simulador de Xcode. Se usa en `/comunidades#demo`.

- URLs en `NEXT_PUBLIC_KEHAL_DEMO_URL` (por defecto `https://chaiactive-demo.vercel.app/`) y `NEXT_PUBLIC_SCHOOL_DEMO_URL` (vacía hasta que exista la de colegios).
- La web añade `?showcase=1&lang=es|en`. La demo (repo `appcomunidaddemo`) usa `showcase=1` para conservar su navegación dentro del iframe, y `lang` para el idioma inicial.
- Requisitos de cualquier demo: que se pueda incrustar (sin `X-Frame-Options` ni `frame-ancestors` restrictivo), que entienda `?showcase=1` y que use **solo datos ficticios**.
- El iframe va en `sandbox` sin `allow-top-navigation`: la demo nunca puede sacar al visitante de chaiactive.com.
- En pantallas táctiles, la demo no captura el dedo hasta que se toca "Toca para probarla", para que la página siga haciendo scroll.

## Formulario de contacto

El selector "¿Qué te interesa?" (Comunidad / Colegio / Empresa / Otra cosa) llega en el asunto y el cuerpo del email. Se preselecciona:

- en cada página según su línea (`PageShell interest="colegio"`),
- al pulsar cualquier botón `ContactLink` con `interest`,
- con `?interes=colegio` en la URL.

## Cómo añadir un caso de éxito

1. Añade la entrada en `components/casos/data.ts` (`slug`, `url`, `line`, `logo` opcional, `screenshots`).
2. Añade `casos.items.<slug>` con `name`, `sector`, `reto`, `solucion`, `resultado` en los cuatro `messages/*.json`.
3. Pon las capturas en `public/images/casos/<slug>/`. Sin capturas se muestra un marcador "Captura pendiente".

Solo datos verificables: nada de cifras sacadas del marketing del cliente.

**Testimonios**: la web no muestra citas de clientes, por decisión de diseño. Si algún día se añaden, que sea solo con aprobación escrita de la persona citada.

## Cómo añadir un idioma

1. Añade el código a `locales` en `i18n/routing.ts` (y a `rtlLocales` si se escribe de derecha a izquierda).
2. Añade su slug en cada entrada de `pathnames`.
3. Crea `messages/<código>.json` copiando `es.json` y traduciendo. Pon `meta.needsReview: true` hasta que lo revise una persona nativa.
4. Añade su nombre a `languageSwitcher` en todos los `messages/*.json`.

## Reglas de contenido

- **Colegios**: es un producto que ofrecemos y hemos diseñado, no una app en uso. Nada de cifras de usuarios ni capturas reales. Los mockups llevan "Diseño conceptual". No se nombra a ningún colegio como cliente.
- **Kehál / Jabad**: "+250 miembros en la app, de una comunidad de más de 750". No usar "+500" ni "desde 1999".
- No inventar métricas, clientes, testimonios ni funcionalidades.
- Cifras: solo las confirmadas (`components/home/StatStrip.tsx`).

## Pendiente antes de dar por cerrada la web

- **Textos legales** (`messages/*.json` → `legal`): borrador de trabajo. Faltan **NIF/CIF, domicilio social y forma jurídica** (marcados con `[...]`). Deben revisarlos un gestor o abogado. Hay un aviso visible en las tres páginas legales.
- **Traducciones en/fr/he**: borrador (`meta.needsReview: true`), pendiente de revisión humana, sobre todo el hebreo.
- **WhatsApp**: definir `NEXT_PUBLIC_WHATSAPP_URL` con el número real.
- **Email**: migrar `jactive@gmail.com` a una dirección `@chaiactive.com` cuando el dominio esté verificado en Resend.
- Analítica (GA/Meta Pixel): no se ha añadido.
