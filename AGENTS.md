# AGENTS.md

Personal CV website for Iñaki Sánchez, served at https://queky.es. It is a single-page React app with a retro pixel-art look. It has an intro dialog, a career map, a skills inventory, extras, the "Sky run" plane mini-game and a contact section.

## Commands

- `npm install` then `npm run dev`: local dev server (Node 18+).
- `npm run build`: type-check (`tsc -b`) and build into `dist/`.
- `docker compose up --build`: full stack locally at https://localhost (self-signed cert).
- `DOMAIN=queky.es docker compose up -d --build`: production deploy.

## Layout

- `src/content.ts`: all text on the site, in Spanish (`es`, the default) and English (`en`). Both languages share the `Content` type, so a missing translation fails the build. Edit text here, not in components.
- `src/i18n.tsx`: language provider and `useLang()` hook. The language comes from `?lang=en`, then the visitor's saved choice, then Spanish.
- `src/components/`: one component per page section. `SkyRun.tsx` is the canvas mini-game.
- `src/hooks/useKonami.ts`: Konami-code easter egg (CRT mode).
- `src/styles.css`: global styles. Colors and fonts are CSS tokens in `:root`.
- `public/`: static files served as-is (`photo.jpg`, and `inaki-sanchez-cv.pdf` once added).
- `Dockerfile`: multi-stage build, node builds and nginx serves `dist/`.
- `nginx/default.conf`: web server config, with caching and the `/healthz` endpoint.
- `Caddyfile` and `docker-compose.yml`: Caddy reverse proxy with automatic HTTPS in front of nginx.

## Conventions

- Keep the pixel-art style: Press Start 2P for display text, VT323 for labels, IBM Plex Mono for body text, hard pixel borders (`.pixel-box`), no rounded corners or soft shadows.
- Take colors from the tokens in `src/styles.css`, never as hard-coded hex values in components. Canvas code reads them with `getComputedStyle`.
- Every text change goes into both languages. Spanish should read naturally, not as a literal translation.
- CV content must stay truthful and match the Word CV. Don't invent achievements, figures or employers. Avoid internal company names, ticket IDs and confidential details.
- Keep the site accessible: keyboard navigation (←/→ on the career map, ↑/↓ in the game), visible focus, `prefers-reduced-motion`, and `aria-*` on interactive widgets.
- It must work at phone width (about 400px) without horizontal scrolling.
- No new runtime dependencies unless they are clearly needed. The site is React plus CSS only.

## Before committing

1. `npm run build` passes (or `docker compose up --build` succeeds).
2. Open the site and check the section you changed at desktop and phone width.
3. Commit messages are short and imperative, for example "Add Stop button to Sky run".
