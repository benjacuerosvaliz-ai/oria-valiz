# ORIA

> Vitrina editorial para maestros chilenos del cuero. Una iniciativa de Valiz.

Capa Next.js 16 sobre Shopify Storefront API. Desplegada en
[oria.valiz.cl](https://oria.valiz.cl) (Vercel). Mismo store Shopify que Valiz
(`valiz-cl.myshopify.com`); el checkout se realiza en valiz.cl.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind v4 (`@tailwindcss/postcss`, configuración inline en `app/globals.css`)
- TypeScript
- `gray-matter` + `marked` para contenido en `/content/*.md`

> ⚠️ Next 16 y Tailwind 4 traen breaking changes vs versiones anteriores. Antes
> de tocar APIs frescas, leer `node_modules/next/dist/docs/`. Ver `AGENTS.md`.

## Estructura

```
app/
  page.tsx                  # Home
  manifiesto/page.tsx       # /manifiesto
  vol-01/page.tsx           # /vol-01 (autor de la estación)
  autor/[handle]/page.tsx   # /autor/marcelo-rojas
  pieza/[slug]/page.tsx     # /pieza/cartera-saco etc.
components/                 # Nav, Footer, PiezaCard, Placeholder
lib/
  piezas.ts                 # catálogo mock (reemplazar por Storefront API)
  content.ts                # loader markdown
  shopify.ts                # cliente Storefront (esqueleto)
content/                    # placeholders editoriales
  manifiesto.md
  autores/marcelo-rojas.md
  piezas/*.md               # 7 fichas
```

## Aislamiento

Repo, app, dominio y stack son independientes de `valiz-bitacora`. Comparten
sólo: cuenta GitHub `benjacuerosvaliz-ai`, scope Vercel
`benjacuerosvaliz-ais-projects`, y Shopify store `valiz-cl`. Ningún componente
ni decisión visual se reutiliza.

## Dev

```bash
npm install
cp .env.example .env.local   # completar SHOPIFY_STOREFRONT_TOKEN
npm run dev                  # http://localhost:3000
npm run build
```

## Estado actual

Sesión 1 (2026-05-24):
- Setup técnico completo.
- Dirección visual definida (Fraunces + Inter, paleta papel/sepia/bramante).
- Estructura de rutas + placeholders editoriales con TODOs explícitos.

Pendiente antes del lanzamiento — todo en `/content/*.md` con `estado: placeholder`:
- Material real de Marcelo Rojas (bio, foto, grabación, ciudad, taller, años).
- Manifiesto fundacional definitivo.
- 7 fichas editoriales firmadas.
- Fotos de cada pieza y de Marcelo.
- Activación de Shopify Storefront API (reemplazar mock `lib/piezas.ts`).

## DNS

Dominio `oria.valiz.cl` configurado en Vercel. En HostingPlus (registrador de
valiz.cl): registro CNAME `oria` → `cname.vercel-dns.com`.
