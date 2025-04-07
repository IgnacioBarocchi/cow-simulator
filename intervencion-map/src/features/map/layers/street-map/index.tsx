import { FC, Suspense } from "react";
import { GeoJSON, LayerGroup, LayersControl } from "react-leaflet";

import { FeatureCollection } from "../../../../../local/data/geo-types";
import useGeoJSONData from "../../hooks/useGeoJSONData";
import useMainMap from "../../hooks/useMainMap";

interface StreetMapLayerProps {
  streetMapData: FeatureCollection;
  name: string;
}

const Layer: FC<StreetMapLayerProps> = ({ name }) => {
  const { data } = useGeoJSONData(import.meta.env.VITE_STREETS_GEO_URL);
  const { style } = useMainMap();

  return (
    <LayersControl.Overlay name={name}>
      <LayerGroup>
        <Suspense fallback={<div>{name}</div>}>
          {data && <GeoJSON data={data} style={style} />}
        </Suspense>
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

export const StreetMap = {
  Layer,
};
