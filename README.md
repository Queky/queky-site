# queky-site

Personal CV website for Iñaki Sánchez, served at [queky.es](https://www.queky.es). A single static page with a retro pixel-art style: career map, skills inventory and a small bug-hunt mini-game.

## Structure

```
site/            static files served as-is (index.html, photo.jpg)
nginx/           nginx server config
Dockerfile       nginx:alpine image with the site baked in
docker-compose.yml
```

To offer the CV as a download, add `site/inaki-sanchez-cv.pdf`; the contact section already links to it.

## Run locally

```sh
docker compose up --build
```

Then open http://localhost:8080. Use another port with `PORT=3000 docker compose up --build`.

Without Docker: `cd site && python3 -m http.server 8000`.

## Deploy

Any host that runs Docker:

```sh
git clone git@github.com:Queky/queky-site.git && cd queky-site
PORT=80 docker compose up -d --build
```

Point the `queky.es` DNS A record to the server and put HTTPS in front (for example Caddy, Traefik or a Cloudflare proxy).

To update: `git pull && docker compose up -d --build`.

Health check endpoint: `/healthz`.
