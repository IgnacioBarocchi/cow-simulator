import avenues from "../data/avenidas.geo.json";
import { StreetMap } from "./street-map";

export const AvenuesLayer = () => {
  return <StreetMap.Layer streetMapData={avenues} name="Avenidas" />;
};
