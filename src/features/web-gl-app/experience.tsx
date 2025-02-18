import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";

import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import SimulatorComponents from "./simulator-components";
import { config } from "./experience-config";

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
      {config.isDev && <Perf />}
      <Physics {...config.physicProps}>
        <GroundCollider />
        <SimulatorComponents />
      </Physics>
      <OrbitControls {...config.orbitControlsProps} />
    </>
  );
};

export default Experience;
