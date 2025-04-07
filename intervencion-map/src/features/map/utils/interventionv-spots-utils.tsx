import { MarkerLeafletIcon, markerIconOptions } from "../rich-marker";

import { Feature } from "../../../../local/data/geo-types";
import { Pin } from "../pin";
import { marker } from "leaflet";

function pointToLayer(feature: Feature, latLng: LatLng) {
  const {
    properties: { TIPO },
  } = feature;

  const color =
    {
      PPL: "#FE938C",
      CPM: "#FFC482",
    }[TIPO] || "lightblue";

  const stroke =
    {
      PPL: "#6C464F",
      CPM: "#775144",
    }[TIPO] || "blue";

  return marker(latLng, {
    icon: new MarkerLeafletIcon({
      ...markerIconOptions,
      icon: <Pin color={color} stroke={stroke} />,
    }),
  });
}

function onEachFeature(feature: Feature, layer: L.Layer) {
  const {
    properties: { TIPO, DOMICILIO: address },
    geometry: { coordinates },
  } = feature;

  const featureType =
    {
      PPL: "Marquesina",
      CPM: "Cartel",
    }[TIPO] || "Desconocido";

  const googleLink = `https://maps.google.com/?q=${coordinates[0]},${coordinates[1]}&z=8`;

  const popupContent = `
    <div style="display:flex; flex-direction:column; gap:8px; width:fit-content">
      <div><strong>Tipo:</strong> ${featureType}</div>
      <div><strong>Dirección:</strong> <a href="${googleLink}" target="_blank">${address}</a></div>
      <div>Maps: <a href="https://www.instantstreetview.com/s/CiudadAutonomaDeBuenosAires${address.replaceAll(
        " ",
        ""
      )}" target="_blank">Ver en el mapa</a></div>
    </div>`;

  layer.bindPopup(popupContent);
}

export { pointToLayer, onEachFeature };
