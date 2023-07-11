import { Canvas } from "@react-three/fiber";
import { CameraOptions } from "../@types/CameraOptions";
import { block } from "million/react";
import { Physics } from "@react-three/rapier";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import Cow from "../../components/Entities/Cow";
import Platform from "../../components/Platform/Platform";
import keysMap from "../../lib/keysMap";
import PhysicalCowCell from "./PhysicalCowCell";
import Instancer from "../../components/Utility/Instancer/Instancer";
import CowPenLight from "./CowPenLight";
// import { Perf } from "r3f-perf";
import { GroundPresets } from "../../lib/textureHelper";

const camera: CameraOptions = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [0, 0, -8],
};

const CowPen = () => {
  return (
    <Canvas shadows camera={camera}>
      {/* <Perf postion="top-left" /> */}
      <OrbitControls makeDefault />
      <CowPenLight />
      <KeyboardControls map={keysMap}>
        <Physics timeStep="vary" debug={false}>
          <PhysicalCowCell />
          <Instancer
            numberOfInstances={20}
            url="/models/Cowcell.gltf"
            columns={5}
            offsetX={5}
            offsetY={0}
            offsetZ={4}
            rows={1}
            groupPosition={[-15, 0, -12]}
            groupRotation={[0, Math.PI * 2, 0]}
          />
          <Platform size={10} preset={GroundPresets.Dirt} />
          <Cow useOrbitControls={false} />
        </Physics>
      </KeyboardControls>
    </Canvas>
  );
};

export default block(CowPen);
