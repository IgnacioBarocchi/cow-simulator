import { ReactThreeFiber } from "@react-three/fiber";
import { useAtom } from "jotai";
import { Camera, OrthographicCamera, PerspectiveCamera } from "three";
import { PlayerProvider } from "./context/player-provider";
import SceneProvider from "./context/scene-provider";
import Cow from "./features/character";
import CowPenScene from "./features/cow-pen-scene";
import { terrainLoadedAtom } from "./store/store";
import { Update } from "./update";

type CameraOptions = (
  | Camera
  | Partial<
      ReactThreeFiber.Object3DNode<Camera, typeof Camera> &
        ReactThreeFiber.Object3DNode<
          PerspectiveCamera,
          typeof PerspectiveCamera
        > &
        ReactThreeFiber.Object3DNode<
          OrthographicCamera,
          typeof OrthographicCamera
        >
    >
) & {
  manual?: boolean;
};

const camera: CameraOptions = {
  fov: 45,
  near: 0.001,
  far: 200,
  position: [-2, 4, -10],
};

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
