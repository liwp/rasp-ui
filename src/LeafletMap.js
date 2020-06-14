import React from "react";
import { Browser } from "leaflet";
import {
  AttributionControl,
  ImageOverlay,
  Map,
  TileLayer,
} from "react-leaflet";
import styled from "styled-components";
import { useQueryParam, useQueryParams, NumberParam } from "use-query-params";

import Spinner from "./Spinner";
import { useIsImageLoading } from "./hooks";

const DEFAULT_ZOOM = 8;
const DEFAULT_LAT = 52.18572;
const DEFAULT_LNG = -0.14591;

const ATTRIBUTION = "&copy; OpenStreetMap contributors";
const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const StyledMap = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-items: center;
`;

const SpinnerContainer = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  display: grid;
  height: 100%;
  justify-items: center;
  left: 0;
  padding-bottom: ${({ theme }) => theme.toolbarHeight};
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 480;
`;

export default function LeafletMap({ bounds, url }) {
  const [{ lat = DEFAULT_LAT, lng = DEFAULT_LNG }, setCenter] = useQueryParams({
    lat: NumberParam,
    lng: NumberParam,
  });
  const [zoom = DEFAULT_ZOOM, setZoom] = useQueryParam("zoom", NumberParam);
  const isLoading = useIsImageLoading(url, 500);

  return (
    <StyledMap>
      {isLoading && (
        <SpinnerContainer>
          <Spinner size={"4rem"} />
        </SpinnerContainer>
      )}
      <Map
        attributionControl={false}
        center={[lat, lng]}
        id="mapId"
        dragging={!Browser.mobile}
        onMoveend={(e) => setCenter(e.target.getCenter())}
        onZoomend={(e) => setZoom(e.target.getZoom())}
        tap={!Browser.mobile}
        zoom={zoom}
        zoomControl={false}
      >
        <AttributionControl position="bottomright" prefix={false} />
        <ImageOverlay bounds={bounds} opacity="0.5" url={url}>
          <TileLayer attribution={ATTRIBUTION} url={URL} />
        </ImageOverlay>
      </Map>
    </StyledMap>
  );
}
