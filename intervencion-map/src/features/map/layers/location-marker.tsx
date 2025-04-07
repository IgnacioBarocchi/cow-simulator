import { useState } from "react";
import {
  Marker,
  Popup,
  useMapEvents,
  LayersControl,
  LayerGroup,
} from "react-leaflet";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    // todo change event
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return (
    <LayersControl.Overlay name="Mi ubicación">
      <LayerGroup>
        {position === null ? null : (
          <Marker position={position}>
            <Popup>Estás acá</Popup>
          </Marker>
        )}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}

export default LocationMarker;
//
// import "leaflet/dist/leaflet.css";
// import { GeoJSON } from "react-leaflet";
// import { Feature } from "../data/geo-types";
// import { useEffect, useState } from "react";
// import { getCurrentPosition } from "api";
// import { LatLng, Marker, Popup, marker } from "leaflet";
// import {
//   MarkerIcon,
//   MarkerLeafletIcon,
//   markerIconOptions,
// } from "../rich-marker";

// const getData = async () => {
//   const position = await getCurrentPosition();
//   //   alert(JSON.stringify(position));
//   return {
//     type: "FeatureCollection",
//     name: "Self location",
//     features: [
//       {
//         type: "Feature",
//         geometry: {
//           type: "Point",
//           coordinates: [position.coords.latitude, position.coords.longitude],
//         },
//       },
//     ],
//   };
// };

// function pointToLayer(_feature: Feature, latLng: LatLng) {
//   return marker(latLng, {
//     icon: new MarkerLeafletIcon({
//       ...markerIconOptions,
//       icon: (
//         <MarkerIcon color={"#3388ff"} imageOpacity={1} markerType="square" />
//       ),
//     }),
//   });
// }

// const SelfLayer = () => {
//   const [geoData, setGeoData] = useState({
//     type: "FeatureCollection",
//     name: "Self location",
//     features: [
//       {
//         type: "Feature",
//         geometry: { type: "Point", coordinates: [-58.381592, -34.603722] },
//       },
//     ],
//   });

//   const updateData = async () => {
//     const newData = await getData();
//     setGeoData(newData);
//     console.log(geoData.features[0].geometry.coordinates);
//   };

//   useEffect(() => {
//     let timeout = 0;

//     timeout = setInterval(updateData, 2000);

//     return () => {
//       clearInterval(timeout);
//     };
//   }, []);

//   return (
//     <Marker position={position}>
//       <Popup>
//         A pretty CSS3 popup. <br /> Easily customizable.
//       </Popup>
//     </Marker>
//   );
// };

// export default SelfLayer;
