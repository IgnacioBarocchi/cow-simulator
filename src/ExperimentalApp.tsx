import {
  Bloom,
  BrightnessContrast,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlurPass, KernelSize, Resolution } from "postprocessing";

import { CameraOptions } from "./@types/CameraOptions";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { degToRad } from "three/src/math/MathUtils.js";
import Cow from "./features/character";
import { PlayerProvider } from "./context/player-provider";
import { Physics } from "@react-three/rapier";
import { Update } from "./containers/scenarios/CowPen/update";
import { useAtom } from "jotai";
import { terrainLoadedAtom } from "./store/store";
import CowPenScene from "./features/cow-pen-scene";
import Loading from "./features/page/loading";

const camera: CameraOptions = {
  fov: 45,
  near: 0.001,
  far: 200,
  position: [-2, 4, -10],
};

const ExperimentalApp = () => {
  const terrainLoaded = useAtom(terrainLoadedAtom);

  return (
    <Canvas shadows camera={camera} fallback={<Loading />}>
      <Perf position="top-left" />
      <OrbitControls
        makeDefault
        minDistance={3.5}
        maxDistance={50}
        enablePan={false}
        minPolarAngle={degToRad(30)}
        maxPolarAngle={degToRad(90)}
      />
      <Physics timeStep="vary" debug={false} gravity={[0, -9.8, 0]}>
        <CowPenScene />
        <PlayerProvider>
          {terrainLoaded && (
            <>
              <Cow />
              <Update />
            </>
          )}
        </PlayerProvider>
      </Physics>
      {/* <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
      </EffectComposer> */}
    </Canvas>
  );
};

export default ExperimentalApp;
