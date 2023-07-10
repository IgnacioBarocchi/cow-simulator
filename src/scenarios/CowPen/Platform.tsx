import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Platform = () => {
  return (
    <RigidBody colliders={"cuboid"} type={"fixed"}>
      <Box args={[50, 0.1, 50]} />
    </RigidBody>
  );
};

export default Platform;
