import {
  KeyboardControls,
  OrbitControls,
  SpotLight,
  useHelper,
} from "@react-three/drei";

import { AppContext } from "../../containers/context/AppContext";
import { CameraOptions } from "./@types/CameraOptions";
import { Canvas } from "@react-three/fiber";
import CowPen from "../../containers/scenarios/CowPen";
import { Perf } from "r3f-perf";
import { block } from "million/react";
import keysMap from "../../lib/keysMap";
import { useContext, useRef } from "react";
import { SpotLightHelper } from "three";

const camera: CameraOptions = {
  fov: 45,
  near: 0.001,
  far: 200,
  position: [-2, 10, -10],
};

// const ScenarioExperience = CowPen;

const Scenario = () => {
  const { MONITOR_PERFORMANCE } = useContext(AppContext);
  const spotLightRef = useRef();

  // Use the helper for the spotlight
  // useHelper(spotLightRef, SpotLightHelper, "cyan");

  return (
    <Canvas shadows camera={camera} fallback={<div>loading</div>}>
      {/* {MONITOR_PERFORMANCE && <Perf position="top-left" />} */}
      <OrbitControls
        makeDefault
        minDistance={3.5} // Minimum zoom level (distance from target)
        maxDistance={10}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
      <KeyboardControls map={keysMap}>
        <CowPen />
      </KeyboardControls>
    </Canvas>
  );
};

export default Scenario;
