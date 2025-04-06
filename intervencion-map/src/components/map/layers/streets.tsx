import "leaflet/dist/leaflet.css";
import { GeoJSON, LayerGroup, LayersControl } from "react-leaflet";
import streets from "../data/bsas-calles-y-pasajes.geo.json";
import { Feature, FeatureCollection } from "../data/geo-types";
import { PathOptions } from "leaflet";
import { Suspense } from "react";
import { colors } from "../../../constants/colors";

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
  return (
    <LayersControl.Overlay name="Calles">
      <LayerGroup>
        <Suspense fallback={<div>calles</div>}>
          <GeoJSON data={streets as FeatureCollection} style={getStreetLine} />
        </Suspense>
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

export const Streets = {
  Layer,
};
