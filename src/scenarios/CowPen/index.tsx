import { Canvas } from "@react-three/fiber";
import { CameraOptions } from "../@types/CameraOptions";
import { block } from "million/react";
import { Physics } from "@react-three/rapier";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import Cow from "../../components/Entities/Cow";
import Platform from "./Platform";
import keysMap from "../../lib/keysMap";
import PhysicalCowCell from "./PhysicalCowCell";
import Instancer from "../../components/Utility/Instancer/Instancer";
import CowPenLight from "./CowPenLight";

const camera: CameraOptions = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [0, 0, -8],
};

const CowPen = () => {
  // const { ox, oz, spx, spxy, spz } = useControls({
  //   spx: { value: 0, min: -20, max: 20 },
  //   spxy: { value: 0, min: -20, max: 20 },
  //   spz: { value: 0, min: -20, max: 20 },

  //   ox: { value: -15, min: -20, max: 20 },
  //   oz: { value: -12, min: -20, max: 20 },
  // });
  return (
    <Canvas shadows camera={camera}>
      <OrbitControls makeDefault />
      <CowPenLight />
      {/* <directionalLight
        castShadow
        position={[0, 4, 4]}
        intensity={0.005}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      /> */}
      {/* <directionalLight
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
      /> */}
      {/* <ambientLight intensity={0} /> */}
      <KeyboardControls map={keysMap}>
        {/* <ExampleComponent /> */}
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

          {/* <Instancer
            numberOfInstances={20}
            url="/models/Cowcell.gltf"
            columns={4}
            offsetX={5}
            offsetY={0}
            offsetZ={4}
            rows={1}
            groupPosition={[-30, 0, -8]}
            groupRotation={[0, Math.PI * 2, 0]}
          /> */}
          <Platform />
          <Cow useOrbitControls={false} />
        </Physics>
      </KeyboardControls>
    </Canvas>
  );
};

export default block(CowPen);
