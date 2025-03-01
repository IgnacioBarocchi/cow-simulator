import { Model } from "./models/Lvl2";
import { terrainLoadedAtom } from "../../../store/store";
import { useEffect } from "react";
import { useSetAtom } from "jotai";

const LVL2 = () => {
  const setTerrainLoaded = useSetAtom(terrainLoadedAtom);

  useEffect(() => {
    setTerrainLoaded(true);
  }, []);

  return (
    <>
      <Model />
    </>
  );
};

export default LVL2;
