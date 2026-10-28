# queky-site

Personal CV website for Iñaki Sánchez, served at [queky.es](https://www.queky.es). It's a React single-page site in a retro pixel-art style, with a career map, a skills inventory and a small bug-hunt mini-game.

## Stack

- React 18 + TypeScript, built with Vite
- nginx serves the static build
- Caddy in front for automatic HTTPS (Let's Encrypt)

## Structure

```
src/             React app (components, data, hooks, styles)
public/          static files copied as-is (photo.jpg; add inaki-sanchez-cv.pdf here)
nginx/           nginx config for the web container
Dockerfile       multi-stage: node builds the app, nginx serves dist/
Caddyfile        HTTPS reverse proxy, redirects www to the apex domain
docker-compose.yml
```

To offer the CV as a download, add `public/inaki-sanchez-cv.pdf`. The contact section already links to it.

## Develop

Requires Node 18+.

```sh
npm install
npm run dev
```

## Run with Docker locally

```sh
docker compose up --build
```

Open https://localhost. Caddy uses a self-signed local certificate, so the browser will warn the first time.

## Deploy

On a server with Docker and ports 80 and 443 open:

1. Point DNS A records for `queky.es` and `www.queky.es` to the server's IP.
2. Run:

   ```sh
   git clone git@github.com:Queky/queky-site.git && cd queky-site
   DOMAIN=queky.es docker compose up -d --build
   ```

Caddy requests and renews the certificates on its own and keeps them in the `caddy_data` volume.

To update: `git pull && DOMAIN=queky.es docker compose up -d --build`.

Health check endpoint (web container): `/healthz`.
