// import streetsAndOthers from "../data/bsas-calles-y-pasajes.geo.json";
import { StreetMap } from "./street-map";

export const StreetsLayer = () => {
  // streetMapData = { streetsAndOthers };
  return <StreetMap.Layer name="Calles" />;
};
