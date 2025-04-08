import {
  LayerGroup,
  LayersControl,
  TileLayer,
  TileLayerProps,
} from "react-leaflet";

import { FC } from "react";

export type TillingProps = Partial<TileLayerProps> & { url: string };

const Tilling: FC<TillingProps> = (props) => {
  return (
    <LayersControl.Overlay checked={false} name="Capa satelital">
      <LayerGroup>
        <TileLayer {...props} />
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

export default Tilling;
//
