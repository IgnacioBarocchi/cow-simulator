import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";

import { Leva } from "leva";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import SimulatorComponents from "./simulator-components";
import { config } from "../../constants/experience-config";
import { publicExperimentalFeatures } from "../../constants/features";

const { debug } = publicExperimentalFeatures;

const GroundCollider = () => {
  return (
    <RigidBody type={"fixed"} colliders={false}>
      <CuboidCollider friction={2} args={[5, 0, 5]} position={[0, 0, 0]} />
    </RigidBody>
  );
};

const Experience = () => {
  return (
    <>
      <Leva hidden={!publicExperimentalFeatures.debug} />
      <Physics {...config.physicProps} debug={debug}>
        <GroundCollider />
        <SimulatorComponents />
      </Physics>
      {debug && <Perf />}
      <OrbitControls {...config.orbitControlsProps} />
    </>
  );
};

export default Experience;
