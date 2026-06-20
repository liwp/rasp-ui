import type { LatLng, LatLngBounds, LatLngTuple } from "leaflet";
import {
  AttributionControl,
  ImageOverlay,
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { NumberParam, useQueryParam, useQueryParams } from "use-query-params";
import { useImageStatus } from "./hooks";
import Spinner from "./Spinner";

const DEFAULT_ZOOM = 8;
const DEFAULT_LAT = 52.18572;
const DEFAULT_LNG = -0.14591;

const ATTRIBUTION = "&copy; OpenStreetMap contributors";
const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

function MapInner({
  bounds,
  url,
  onMove,
  onZoom,
}: {
  bounds: LatLngBounds;
  url: string;
  onMove: (center: LatLng) => void;
  onZoom: (zoom: number) => void;
}) {
  useMapEvents({
    moveend(e) {
      onMove(e.target.getCenter());
    },
    zoomend(e) {
      onZoom(e.target.getZoom());
    },
  });

  return (
    <>
      <AttributionControl position="bottomright" prefix={false} />
      <ImageOverlay bounds={bounds} opacity={0.5} url={url}>
        <TileLayer attribution={ATTRIBUTION} url={URL} />
      </ImageOverlay>
    </>
  );
}

export default function LeafletMap({
  bounds,
  url,
}: {
  bounds: LatLngBounds;
  url: string;
}) {
  const [{ lat, lng }, setCenter] = useQueryParams({
    lat: NumberParam,
    lng: NumberParam,
  });
  const [zoomParam, setZoom] = useQueryParam("zoom", NumberParam);
  const status = useImageStatus(url, 500);

  const center: LatLngTuple = [lat ?? DEFAULT_LAT, lng ?? DEFAULT_LNG];
  const zoom = zoomParam ?? DEFAULT_ZOOM;

  return (
    <div className="map">
      {status === "loading" && (
        <div className="spinner-container">
          <Spinner size={"4rem"} />
        </div>
      )}
      {status === "error" && (
        <div className="forecast-error">
          <p>⚠ Forecast unavailable — the RASP CDN may have moved.</p>
        </div>
      )}
      <MapContainer
        attributionControl={false}
        center={center}
        id="mapId"
        zoom={zoom}
        zoomControl={false}
      >
        <MapInner
          bounds={bounds}
          url={url}
          onMove={setCenter}
          onZoom={setZoom}
        />
      </MapContainer>
    </div>
  );
}
