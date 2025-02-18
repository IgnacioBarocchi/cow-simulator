import Cow from "../character";
import CurrentScene from "../scenes/current-scene";
import { PlayerProvider } from "../../context/player-provider";
import { Update } from "../../update";
import { terrainLoadedAtom } from "../../store/store";
import { useAtom } from "jotai";

const GameLogic = () => (
  <PlayerProvider>
    <Cow />
    <Update />
  </PlayerProvider>
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
