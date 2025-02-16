import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { terrainLoadedAtom } from "../../store/store";
import { Model } from "./models/Lvl2";

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
