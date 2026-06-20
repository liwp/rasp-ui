# RASP

A web UI for browsing [RASP](http://rasp.mrsap.org/) soaring weather forecasts
for the UK. It overlays the RASP forecast images on an interactive
[Leaflet](https://leafletjs.com/) map and lets you switch between forecast
layers and scrub through the available days and hours.

Live at **https://rasp.surge.sh**.

## Forecast layers

| Key           | Label                 |
| ------------- | --------------------- |
| `stars`       | Star rating (default) |
| `wstar`       | Updraft velocity      |
| `zsfclclmask` | Cu Cloudbase          |
| `rain1`       | Rain                  |
| `sfcwind`     | Wind – 10m            |
| `blwind`      | Wind – BL             |

The selected layer is stored in the `?layer=` query param. Forecast resolution
varies by day (2 km today, UK4 tomorrow, UK12 beyond); the host and image URL
scheme are defined in [`src/rasp.ts`](src/rasp.ts).

> Note: the upstream RASP CDN host changes from time to time. When forecasts
> stop loading or show stale data, check/update `RASP_BASE_URL` in
> [`src/rasp.ts`](src/rasp.ts).

## Tech stack

TypeScript · [React](https://react.dev/) ·
[React Leaflet](https://react-leaflet.js.org/) · [Vite](https://vite.dev/) ·
[Vitest](https://vitest.dev/) · [Biome](https://biomejs.dev/) ·
[Bun](https://bun.sh/)

## Development

```sh
bun install
bun run dev        # dev server at http://localhost:5173
bun run test       # run tests (Vitest)
bun run typecheck  # type-check (tsc --noEmit)
bun run lint       # lint + format check (Biome)
bun run build      # production build into dist/
bun run deploy     # build and publish to rasp.surge.sh (via surge)
```
