import { GeoJSON, LayerGroup, LayersControl } from "react-leaflet";

import { PathOptions } from "leaflet";
import { Suspense } from "react";
import { colors } from "../../../constants/colors";
import neighborhoods from "../../../../local/data/comunas.geo.json";

export const CommunesLayer = () => {
  const getNeighborhoodStyleCB = () => {
    return (feature): PathOptions => {
      const fillProps = {
        fillOpacity: 1,
        fillColor: "none", // colors.fill,
        //: colors.disabled,
      };

      return {
        ...fillProps,
        color: colors.stroke,
        opacity: 1,
        weight: 2,
      };
    };
  };

  return (
    <LayersControl.Overlay name="Comunas" checked>
      <LayerGroup>
        <Suspense fallback={<div>Comunas</div>}>
          <GeoJSON data={neighborhoods} style={getNeighborhoodStyleCB()} />
        </Suspense>
      </LayerGroup>
    </LayersControl.Overlay>
  );
};
