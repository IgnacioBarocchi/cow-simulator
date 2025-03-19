import { Model } from "./models/Lvl2";
import { useEffect } from "react";
import { useSetAtom } from "jotai";

// import { terrainLoadedAtom } from "../../../store/store";

const LVL2 = () => {
  // const setTerrainLoaded = useSetAtom(terrainLoadedAtom);

  // useEffect(() => {
  //   setTerrainLoaded(true);
  // }, []);

  return (
    <>
      <Model />
    </>
  );
};

export default LVL2;
