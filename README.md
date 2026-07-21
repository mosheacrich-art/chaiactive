# Chai Active — web corporativa

Landing page corporativa de Chai Active (Barcelona), presentando Kehál Platform y el resto de proyectos de la empresa. Next.js 16 (App Router) + Tailwind CSS v4 + next-intl.

## Empezar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El castellano es el idioma por defecto y vive en `/`; el resto de idiomas en `/en`, `/he`, `/fr`.

## Internacionalización

- `es` (por defecto, sin prefijo), `en`, `he` (RTL), `fr` — gestionado con [next-intl](https://next-intl.dev).
- Contenido en `messages/{locale}.json`. El castellano está completo y revisado; `en`/`fr`/`he` son traducciones de borrador (`meta.needsReview: true` en cada JSON) — se muestra un aviso automático en las páginas legales, y debe revisarse todo el copy antes de publicar en producción.
- El hebreo fuerza `dir="rtl"` en `<html>` (ver `app/[locale]/layout.tsx` e `i18n/routing.ts`) y usa una tipografía serif distinta (Frank Ruhl Libre) para los titulares, ya que Playfair Display no soporta glifos hebreos.

## Decisiones tomadas por defecto (documentadas, no preguntadas una a una)

- **Email del formulario de contacto: [Resend](https://resend.com)** — mismo proveedor que ya usa Creative Favours en este ecosistema. Configura `RESEND_API_KEY` en `.env.local` (ver `.env.example`). Sin esa variable, el formulario responde con error controlado en vez de fallar en silencio.
- El remitente usa `onboarding@resend.dev` (dominio de pruebas de Resend) porque `chaiactive.com` todavía no está registrado ni verificado en Resend. Cuando haya dominio propio, cambia el `from` en `app/api/contact/route.ts` y verifica el dominio en Resend.
- Capturas de pantalla de Kehál en `public/images/app/` son reales (Jabad Barcelona), no maquetas. Se muestran en un frame de navegador (no de móvil) porque los originales son capturas de escritorio — un mockup de móvil las habría distorsionado.

## Pendiente antes de producción

- **Dominio**: `chaiactive.com` — pendiente de registrar. Desplegado de momento en un subdominio de Vercel.
- **Logo**: no hay logo definitivo — el header usa el nombre "Chai Active" en tipografía serif como placeholder.
- **Calendly**: enlace placeholder en `components/Contacto.tsx` (`CALENDLY_URL`) — sustituir por el real.
- **WhatsApp**: número placeholder en `components/Contacto.tsx` (`WHATSAPP_URL`) — sustituir por el real.
- **Email de contacto**: `jactive@gmail.com` en uso; migrar a `contacto@chaiactive.com` cuando exista el dominio (hay que actualizarlo en `messages/*.json` y en `CONTACT_TO_EMAIL`).
- **Textos legales** (`messages/*.json` → `legal`): son un borrador de trabajo con placeholders `[...]` (NIF/CIF, domicilio, forma jurídica). Deben revisarse por un abogado/gestoría antes de publicar — hay un aviso visible en las tres páginas legales que lo recuerda.
- **Capturas de Creative Favours y Perashapp**: la sección de casos de éxito no tiene imágenes propias todavía (solo texto) — añadir cuando estén disponibles.
- Traducciones EN/FR/HE: borrador, pendiente de revisión humana.
- Analítica (GA/Meta Pixel): no se ha añadido, tal y como se pidió.

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena:

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=jactive@gmail.com
```

## Estructura

- `app/[locale]/` — páginas (home + `aviso-legal`, `privacidad`, `cookies`)
- `app/api/contact/` — endpoint del formulario de contacto (Resend)
- `components/` — una sección de la landing por componente
- `messages/` — contenido por idioma
- `i18n/` — configuración de next-intl (routing, navigation, request config)
- `proxy.ts` — middleware de enrutado de idioma (renombrado de `middleware.ts` a `proxy.ts` por el cambio de convención en Next.js 16)
