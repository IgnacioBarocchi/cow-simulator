import { useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { block } from "million/react";
import { CameraOptions } from "./@types/CameraOptions";
import keysMap from "../../lib/keysMap";
import { AppContext } from "../../containers/context/AppContext";
import CowPen from "../../containers/scenarios/CowPen";

const camera: CameraOptions = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [-2, 4, -4],
};

const Scenario = () => {
  const { MONITOR_PERFORMANCE } = useContext(AppContext);
  const ScenarioExperience = CowPen;

  return (
    <Canvas shadows camera={camera}>
      {MONITOR_PERFORMANCE && <Perf postion="top-left" />}
      <OrbitControls makeDefault />
      <KeyboardControls map={keysMap}>
        {<ScenarioExperience />}
      </KeyboardControls>
    </Canvas>
  );
};
export default block(Scenario);
