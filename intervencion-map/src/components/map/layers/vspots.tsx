import { GeoJSON, LayerGroup, LayersControl } from "react-leaflet";
import { Feature } from "../data/geo-types";
import { FC, Suspense, useEffect, useState } from "react";
// import { GeoJSONFile, getData } from "api";

import mock from "../data/complete2.json";
import { marker } from "leaflet";
import { MarkerLeafletIcon, markerIconOptions } from "../rich-marker";
import { Pin } from "../pin";
// import MarkerClusterGroup from "next-leaflet-cluster";

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

export const InterventionVLayer: FC<{ mockData: boolean }> = ({ mockData }) => {
  const [VSpots, setVSpots] = useState<GeoJSONFile>(
    mockData ? mock : undefined
  );

  useEffect(() => {
    const calloutData = async () => {
      const response = await getData();
      setVSpots(response);
    };

    if (!VSpots) {
      calloutData();
    }
  });

  return (
    <LayersControl.Overlay name="Intervenciones">
      <LayerGroup>
        <Suspense fallback={<div>Carteles</div>}>
          <GeoJSON
            data={VSpots}
            onEachFeature={onEachFeature}
            pointToLayer={pointToLayer}
          />
          {/* {VSpots && (
            <MarkerClusterGroup
              spiderLegPolylineOptions={{
                weight: 0,
                opacity: 0,
              }}
            >
              <GeoJSON
                data={VSpots}
                onEachFeature={onEachFeature}
                pointToLayer={pointToLayer}
              />
            </MarkerClusterGroup>
          )} */}
        </Suspense>
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

/*
 `https://www.google.com/maps/search/${coordinates[0]},${coordinates[1]}/@${coordinates[0]},${coordinates[1]},13z`;
*/
// MarkerIcon,
//<MarkerIcon color={color} imageOpacity={1} markerType="pin" />,
