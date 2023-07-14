import { KeyboardControls, OrbitControls } from "@react-three/drei";

import { AppContext } from "../../containers/context/AppContext";
import { CameraOptions } from "./@types/CameraOptions";
import { Canvas } from "@react-three/fiber";
import CowPen from "../../containers/scenarios/CowPen";
import { Perf } from "r3f-perf";
import { block } from "million/react";
import keysMap from "../../lib/keysMap";
import { useContext } from "react";

const camera: CameraOptions = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [-2, 10, -10],
};

const Scenario = () => {
  const { MONITOR_PERFORMANCE } = useContext(AppContext);
  const ScenarioExperience = CowPen;

  return (
    <Canvas shadows camera={camera}>
      {MONITOR_PERFORMANCE && <Perf position="top-left" />}

      <OrbitControls makeDefault />
      <KeyboardControls map={keysMap}>
        {<ScenarioExperience />}
      </KeyboardControls>
    </Canvas>
  );
};
export default block(Scenario);
