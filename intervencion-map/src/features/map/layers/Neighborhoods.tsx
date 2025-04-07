// import Select from "react-select";
import { GeoJSON, LayerGroup, LayersControl } from "react-leaflet";

import { PathOptions } from "leaflet";
import { Suspense } from "react";
import { colors } from "../../../constants/colors";
import neighborhoods from "../../../../local/data/bsas-barrios.geo.json";
// import a from "../data/bsas-barrios.geo.json"

const Layer = () => {
  // const [selectedNeighborhoods] = useSelectedNeighborhoods();

  const getNeighborhoodStyleCB = () => {
    return (feature): PathOptions => {
      const neighborhoodName = feature.properties.BARRIO;
      const selected = selectedNeighborhoods.find(
        (o) => o?.value === neighborhoodName
      );
      const fillProps = {
        fillOpacity: selected ? 0.2 : 1,
        fillColor: selected ? colors.fill : colors.disabled,
      };

      return {
        ...fillProps,
        color: colors.stroke,
        opacity: 1,
        weight: 2,
      };
    };
  };

  return (
    <LayersControl.Overlay name="Barrios" checked>
      <LayerGroup>
        <Suspense fallback={<div>barrios</div>}>
          <GeoJSON
            data={neighborhoods}
            //  style={getNeighborhoodStyleCB()}
          />
        </Suspense>
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

const Selection = ({}) => {
  // const [selectedNeighborhoods, setSelectedNeighborhoods] =
  //   useSelectedNeighborhoods();

  // const handleChange = (selectedOptions) => {
  //   setSelectedNeighborhoods(selectedOptions);
  // };

  return null;
  // return (
  // <Select
  //   isMulti
  //   value={selectedNeighborhoods}
  //   // options={neighborhoodNames}
  //   onChange={handleChange}
  //   placeholder="Seleccioná un barrio"
  // />
  // );
};

export const Neighborhood = {
  Layer,
  // Selection,
};
