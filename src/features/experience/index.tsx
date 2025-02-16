import { useAtom } from "jotai";
import { PlayerProvider } from "../../context/player-provider";
import { terrainLoadedAtom } from "../../store/store";
import Cow from "../character";
import CurrentScene from "../scenes/current-scene";
import { Update } from "../../update";

const GameLogic = () => (
  <PlayerProvider>
    <Cow />
    <Update />
  </PlayerProvider>
);

const Experience = () => {
  const terrainLoaded = useAtom(terrainLoadedAtom);

  return (
    <>
      <CurrentScene />
      {terrainLoaded && <GameLogic />}
    </>
  );
};

export default Experience;
