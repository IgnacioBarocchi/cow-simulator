import CurrentScene from "./scenes/current-scene";
import { Player } from "@mono/characters";
import { Update } from "../../update";
import { terrainLoadedAtom } from "../../store/store";
import { useAtom } from "jotai";

// todo convert to local atom
const terrainLoaded = true;

const GameLogic = () => (
  <>
    <Player.Character />
    <Player.Update />
  </>
);

const SimulatorComponents = () => {
  //

  return (
    <>
      <CurrentScene />
      {terrainLoaded && <GameLogic />}
    </>
  );
};

export default SimulatorComponents;
