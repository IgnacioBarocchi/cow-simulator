import { StreetMap } from "./street-map";
import avenues from "../../../../local/data/avenidas.geo.json";

export const AvenuesLayer = () => {
  return <StreetMap.Layer streetMapData={avenues} name="Avenidas" />;
};
