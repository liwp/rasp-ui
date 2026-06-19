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
scheme are defined in [`src/rasp.js`](src/rasp.js).

> Note: the upstream RASP CDN host changes from time to time. When forecasts
> stop loading or show stale data, check/update `RASP_BASE_URL` in
> [`src/rasp.js`](src/rasp.js).

## Development

Built with [Create React App](https://github.com/facebook/create-react-app).

```sh
npm install
npm start        # dev server at http://localhost:3000
npm test         # run tests
npm run lint     # eslint
npm run build    # production build into build/
npm run deploy   # build and publish to rasp.surge.sh (via surge)
```
