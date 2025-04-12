import "leaflet/dist/leaflet.css";

import { Suspense, lazy } from "react";
import {
  onEachFeature,
  pointToLayer,
} from "../utils/interventionv-spots-utils.tsx";

import { geojsonUrls } from "../../../constants/colors.ts";
import { getStreetsStyle } from "../utils/styles.ts";

const Tilling = lazy(() => import("../components/tilling.tsx"));
const Layer = lazy(() => import("../components/layer.tsx"));

const layers = [
  {
    overlayTitle: "Intervención V",
    dataURL: geojsonUrls.vspots,
    onEachFeature,
    pointToLayer,
  },
  {
    overlayTitle: "Barrios",
    dataURL: geojsonUrls.neighborhoods,
    defaultOn: true,
  },
  {
    overlayTitle: "Calles",
    dataURL: geojsonUrls.streets,
    style: getStreetsStyle,
  },
];

const tilling = {
  url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", // "https://servicios.usig.buenosaires.gob.ar/mapcache/tms/1.0.0/amba_con_transporte_3857@GoogleMapsCompatible/{z}/{x}/{-y}.png",
  secondUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  minZoom: 13,
  maxZoom: 19,
};

export const MapContents = () => {
  return (
    <>
      {layers.map((layer) => (
        <Suspense>
          <Layer key={layer.overlayTitle} {...layer} />
        </Suspense>
      ))}
      <Suspense>
        <Tilling {...tilling} />
      </Suspense>
    </>
  );
};
