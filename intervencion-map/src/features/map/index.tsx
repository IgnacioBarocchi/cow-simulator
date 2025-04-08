import "leaflet/dist/leaflet.css";

import { LayersControl, MapContainer } from "react-leaflet";

import { LatLngExpression } from "leaflet";
import { MapContents } from "./layers/vspots";
import { Neighborhood } from "./layers/Neighborhoods";
import { Tilling } from "./components/tilling";
import { colors } from "../../constants/colors";

const obelisk: LatLngExpression = [-34.603722, -58.381592]; // [55.73333, 24.35];

const MapPlaceholder = () => {
  return (
    <p>
      Mapa de intervención V.{" "}
      <noscript>activá JavaScript para ver este mapa.</noscript>
    </p>
  );
};

const MapComponent = () => {
  return (
    <>
      <MapContainer
        center={obelisk}
        zoom={13}
        minZoom={13}
        maxZoom={19}
        placeholder={<MapPlaceholder />}
        scrollWheelZoom={false}
        style={{
          height: "100vh",
          width: "100%",
          backgroundColor: colors.background,
        }}
      >
        <LayersControl position="topright">
          <MapContents />
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default MapComponent;
