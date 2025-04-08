import {
  GeoJSON,
  GeoJSONProps,
  LayerGroup,
  LayersControl,
} from "react-leaflet";

import { FC } from "react";
import useGeoJSONData from "../hooks/useGeoJSONData";

interface LeafletGeoJSON extends GeoJSONProps {
  style?: Function;
  onEachFeature?: Function;
  pointToLayer?: Function;
}
export interface LayerProps extends LeafletGeoJSON {
  overlayTitle: string;
  dataURL: string;
  defaultOn?: boolean;
}

const Layer: FC<LayerProps> = ({
  overlayTitle,
  dataURL,
  onEachFeature,
  pointToLayer,
  defaultOn,
  style,
}) => {
  const { data } = useGeoJSONData(dataURL);

  return (
    <LayersControl.Overlay name={overlayTitle} checked={defaultOn}>
      <LayerGroup>
        {data && (
          <GeoJSON
            data={data}
            onEachFeature={onEachFeature ?? undefined}
            pointToLayer={pointToLayer ?? undefined}
            style={style ?? undefined}
          />
        )}
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

export default Layer;
