import React from "react";
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
  display: grid;
  height: 100%;
  width: 100%;
`;

const SpinnerContainer = styled.div`
  align-items: center;
  display: grid;
  height: 100%;
  justify-items: center;
  padding-bottom: ${({ theme }) => theme.toolbarHeight};
  position: absolute;
  width: 100%;
  z-index: 480;

  &:before {
    background-color: ${({ theme }) => theme.primaryDark};
    content: "";
    height: 100%;
    left: 0;
    opacity: 0.2;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 479;
  }
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
        onMoveend={(e) => setCenter(e.target.getCenter())}
        onZoomend={(e) => setZoom(e.target.getZoom())}
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
