import streetsAndOthers from "../data/bsas-calles-y-pasajes.geo.json";
import { StreetMap } from "./street-map";

export const StreetsLayer = () => {
  return <StreetMap.Layer streetMapData={streetsAndOthers} name="Calles" />;
};
