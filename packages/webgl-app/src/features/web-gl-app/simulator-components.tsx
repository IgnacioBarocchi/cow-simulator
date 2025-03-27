import CurrentScene from "./scenes/current-scene";
import { Player } from "@mono/characters";

// todo convert to local atom
const terrainLoaded = true;

const GameLogic = () => (
  <>
    <Player.Character />
    <Player.Update />
  </>
);

const SimulatorComponents = () => {
  return (
    <>
      <CurrentScene />
      {/* {terrainLoaded && <GameLogic />} */}
      <GameLogic />
    </>
  );
};

export default SimulatorComponents;
