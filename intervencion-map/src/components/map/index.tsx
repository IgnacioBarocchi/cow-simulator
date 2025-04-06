import "leaflet/dist/leaflet.css";

import { LayersControl, MapContainer } from "react-leaflet";

import { AvenuesLayer } from "./layers/avenues-layer";
import { CommunesLayer } from "./layers/comunes";
import { InterventionVLayer } from "./layers/vspots";
import { LatLngExpression } from "leaflet";
import LocationMarker from "./layers/location-marker";
// import { InterventionVLayer } from "./layers/vspots";
import { Neighborhood } from "./layers/Neighborhoods";
import { SatelliteLayer } from "./layers/satellite-layer";
import { StreetsLayer } from "./layers/streets-layer";
import { colors } from "../../constants/colors";

// const obelisk: LatLngExpression = [-58.381592, -34.603722]; // [-34.603722, -58.381592];
const panevezys: LatLngExpression = [-34.603722, -58.381592]; // [55.73333, 24.35];

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
        center={panevezys}
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
          <InterventionVLayer mockData={true} />
          <SatelliteLayer />
          <CommunesLayer />
          <Neighborhood.Layer />
          <StreetsLayer />
          <AvenuesLayer />
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default MapComponent;
