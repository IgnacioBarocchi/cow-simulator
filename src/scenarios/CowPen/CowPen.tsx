import { Canvas } from "@react-three/fiber";
import { CameraOptions } from "../@types/CameraOptions";
import { block } from "million/react";
import { Physics } from "@react-three/rapier";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import Cow from "../../components/Entities/Cow";
import Platform from "./Platform";
import keysMap from "../../lib/keysMap";

const camera: CameraOptions = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [0, 0, -8],
};

const CowPen = () => {
  return (
    <Canvas shadows camera={camera}>
      <OrbitControls makeDefault />
      <directionalLight
        castShadow
        position={[0, 4, 4]}
        intensity={1}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <directionalLight
        castShadow
        position={[0, -4, -4]}
        intensity={0.1}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={1} />
      <KeyboardControls map={keysMap}>
        <Physics timeStep="vary" debug={true}>
          <Cow useOrbitControls={false} />
          <Platform />
        </Physics>
      </KeyboardControls>
    </Canvas>
  );
};

export default block(CowPen);
