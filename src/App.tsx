import Cow from "./features/character";
import CowPenScene from "./features/cow-pen-scene";
import { PlayerProvider } from "./context/player-provider";
import SceneProvider from "./context/scene-provider";
import { Update } from "./update";
import { terrainLoadedAtom } from "./store/store";
import { useAtom } from "jotai";

const App = () => {
  const terrainLoaded = useAtom(terrainLoadedAtom);

  return (
    <SceneProvider>
      <CowPenScene />
      <PlayerProvider>
        {terrainLoaded && (
          <>
            <Cow />
            <Update />
          </>
        )}
      </PlayerProvider>
    </SceneProvider>
  );
};

export default App;
