import * as THREE from "three";

import {
  Bloom,
  BrightnessContrast,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlurPass, KernelSize, Resolution } from "postprocessing";

import { CameraOptions } from "./@types/CameraOptions";
import { Canvas } from "@react-three/fiber";
import Cow from "./features/character";
import CowPenScene from "./features/cow-pen-scene";
import { GLTF } from "three-stdlib";
import Loading from "./features/page/loading";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import { PlayerProvider } from "./context/player-provider";
import { Update } from "./containers/scenarios/CowPen/update";
import { degToRad } from "three/src/math/MathUtils.js";
import { terrainLoadedAtom } from "./store/store";
import { useAtom } from "jotai";
import { useGLTF } from "@react-three/drei";

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
      {/* <Perf position="top-left" /> */}
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
