import React from "react";
import { ImageOverlay, Map, TileLayer } from "react-leaflet";
import styled from "styled-components";
import { useQueryParam, useQueryParams, NumberParam } from "use-query-params";

const DEFAULT_ZOOM = 8;
const DEFAULT_LAT = 52.18572;
const DEFAULT_LNG = -0.14591;

const ATTRIBUTION =
  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const StyledMap = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
`;

export default function LeafletMap({ bounds, url }) {
  const [{ lat = DEFAULT_LAT, lng = DEFAULT_LNG }, setCenter] = useQueryParams({
    lat: NumberParam,
    lng: NumberParam,
  });
  const [zoom = DEFAULT_ZOOM, setZoom] = useQueryParam("zoom", NumberParam);

  return (
    <StyledMap>
      <Map
        center={[lat, lng]}
        onMoveend={(e) => setCenter(e.target.getCenter())}
        onZoomend={(e) => setZoom(e.target.getZoom())}
        zoom={zoom}
        zoomControl={false}
      >
        <ImageOverlay bounds={bounds} opacity="0.5" url={url}>
          <TileLayer attribution={ATTRIBUTION} url={URL} />
        </ImageOverlay>
      </Map>
    </StyledMap>
  );
}
