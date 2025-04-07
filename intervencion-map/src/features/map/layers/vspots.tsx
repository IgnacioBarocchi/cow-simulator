import { GeoJSON, LayerGroup, LayersControl } from "react-leaflet";
import {
  onEachFeature,
  pointToLayer,
} from "../utils/interventionv-spots-utils.tsx";

import { Suspense } from "react";
import useGeoJSONData from "../hooks/useGeoJSONData";

export const InterventionVLayer = () => {
  const { data } = useGeoJSONData(
    import.meta.env.VITE_INTERVENTION_SPOTS_GEO_URL
  );

  return (
    <LayersControl.Overlay name="Intervenciones">
      <LayerGroup>
        <Suspense fallback={<div>Carteles</div>}>
          {data && (
            <GeoJSON
              data={data}
              onEachFeature={onEachFeature}
              pointToLayer={pointToLayer}
            />
          )}
        </Suspense>
      </LayerGroup>
    </LayersControl.Overlay>
  );
};
