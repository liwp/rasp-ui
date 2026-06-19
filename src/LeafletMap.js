import {
  AttributionControl,
  ImageOverlay,
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { NumberParam, useQueryParam, useQueryParams } from "use-query-params";
import { useIsImageLoading } from "./hooks";
import Spinner from "./Spinner";

const DEFAULT_ZOOM = 8;
const DEFAULT_LAT = 52.18572;
const DEFAULT_LNG = -0.14591;

const ATTRIBUTION = "&copy; OpenStreetMap contributors";
const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

function MapInner({ bounds, url, onMove, onZoom }) {
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
      <ImageOverlay bounds={bounds} opacity="0.5" url={url}>
        <TileLayer attribution={ATTRIBUTION} url={URL} />
      </ImageOverlay>
    </>
  );
}

export default function LeafletMap({ bounds, url }) {
  const [{ lat = DEFAULT_LAT, lng = DEFAULT_LNG }, setCenter] = useQueryParams({
    lat: NumberParam,
    lng: NumberParam,
  });
  const [zoom = DEFAULT_ZOOM, setZoom] = useQueryParam("zoom", NumberParam);
  const isLoading = useIsImageLoading(url, 500);

  return (
    <div className="map">
      {isLoading && (
        <div className="spinner-container">
          <Spinner size={"4rem"} />
        </div>
      )}
      <MapContainer
        attributionControl={false}
        center={[lat, lng]}
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
