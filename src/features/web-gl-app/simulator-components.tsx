import Cow from "./character";
import CurrentScene from "./scenes/current-scene";
import { Update } from "../../update";
import { terrainLoadedAtom } from "../../store/store";
import { useAtom } from "jotai";

const GameLogic = () => (
  <>
    <Cow />
    <Update />
  </>
);

const SimulatorComponents = () => {
  const terrainLoaded = useAtom(terrainLoadedAtom);

  return (
    <>
      <CurrentScene />
      {terrainLoaded && <GameLogic />}
    </>
  );
};

export default SimulatorComponents;
