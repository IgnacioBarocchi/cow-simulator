import { LayerGroup, LayersControl, TileLayer } from "react-leaflet";

export const SatelliteLayer = () => {
  return (
    <LayersControl.Overlay checked={false} name="Capa satelital">
      <LayerGroup>
        <TileLayer
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://servicios.usig.buenosaires.gob.ar/mapcache/tms/1.0.0/amba_con_transporte_3857@GoogleMapsCompatible/{z}/{x}/{-y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          minZoom={13}
          maxZoom={19}
        />
      </LayerGroup>
    </LayersControl.Overlay>
  );
};
