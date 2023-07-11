import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Platform = () => {
  return (
    <RigidBody colliders={"cuboid"} type={"fixed"}>
      <Box receiveShadow args={[50, 0.1, 50]}>
        <meshStandardMaterial attach="material" color="gray" />
      </Box>
    </RigidBody>
  );
};

export default Platform;
