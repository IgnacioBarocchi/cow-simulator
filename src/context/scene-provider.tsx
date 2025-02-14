import { Camera, OrthographicCamera, PerspectiveCamera } from "three";
import { Canvas, ReactThreeFiber } from "@react-three/fiber";

import { InputControls } from "../features/character/controller/input";
import Loading from "../features/page/loading";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import { degToRad } from "three/src/math/MathUtils.js";

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

const isDev = window.location.pathname.endsWith("/dev");
const SceneProvider = ({ children }) => {
  // const terrainLoaded = useAtom(terrainLoadedAtom);

  return (
    <>
      {/* <LoadingScreen /> */}
      <InputControls />
      <Canvas shadows camera={camera} fallback={<Loading />}>
        {isDev && <Perf />}
        <OrbitControls
          makeDefault
          minDistance={3.5}
          maxDistance={50}
          enablePan={false}
          minPolarAngle={degToRad(30)}
          maxPolarAngle={degToRad(90)}
        />
        <Physics timeStep="vary" debug={isDev} gravity={[0, -9.8, 0]}>
          {children}
        </Physics>
      </Canvas>
    </>
  );
};

export default SceneProvider;
