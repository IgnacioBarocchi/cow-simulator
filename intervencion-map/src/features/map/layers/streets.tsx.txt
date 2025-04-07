import "leaflet/dist/leaflet.css";

import { Feature, FeatureCollection } from "../../../../local/data/geo-types";
import { GeoJSON, LayerGroup, LayersControl } from "react-leaflet";

import { PathOptions } from "leaflet";
import { Suspense } from "react";
import { colors } from "../../../constants/colors";
import useGeoJSONData from "../hooks/useGeoJSONData";

const getStreetLine = (feature: Feature): PathOptions => {
  const streetType = feature.properties.tipo_c;
  const style = {
    AVENIDA: { weight: 10, color: colors.avenues },
    CALLE: { weight: 5, color: colors.streets },
    PASAJE: { weight: 5, color: colors.streets },
    BOULEVARD: { weight: 5, color: colors.streets },
    SENDERO: { weight: 5, color: colors.streets },
    AUTOPISTA: { weight: 5, color: colors.streets },
    "ENLACE AUTOPISTA": { weight: 5, color: colors.streets },
  }[streetType];

  return style;
};

const Layer = () => {
  const { data } = useGeoJSONData(import.meta.env.VITE_STREETS_GEO_URL);

  return (
    <LayersControl.Overlay name="Calles">
      <LayerGroup>
        <Suspense fallback={<div>calles</div>}>
          {data && (
            <GeoJSON data={data as FeatureCollection} style={getStreetLine} />
          )}
        </Suspense>
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

export const Streets = {
  Layer,
};
