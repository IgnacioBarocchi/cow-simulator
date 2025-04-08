import "leaflet/dist/leaflet.css";

import { Suspense, lazy } from "react";
import {
  onEachFeature,
  pointToLayer,
} from "../utils/interventionv-spots-utils.tsx";

import { getStreetsStyle } from "../utils/styles.ts";

const Tilling = lazy(() => import("../components/tilling.tsx"));
const Layer = lazy(() => import("../components/layer.tsx"));

const layers = [
  {
    overlayTitle: "Intervención V",
    dataURL: import.meta.env.VITE_INTERVENTION_SPOTS_GEO_URL,
    onEachFeature,
    pointToLayer,
  },
  {
    overlayTitle: "Barrios",
    dataURL: import.meta.env.VITE_NEIGHBORHOODS_GEO_URL,
    defaultOn: true,
  },
  {
    overlayTitle: "Calles",
    dataURL: import.meta.env.VITE_STREETS_GEO_URL,
    style: getStreetsStyle,
  },
];

const tilling = {
  url: "https://servicios.usig.buenosaires.gob.ar/mapcache/tms/1.0.0/amba_con_transporte_3857@GoogleMapsCompatible/{z}/{x}/{-y}.png",
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
