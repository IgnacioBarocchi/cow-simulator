import { CuboidCollider, RigidBody } from "@react-three/rapier";

const CowPenMapBounding = () => {
  return (
    <RigidBody type={"fixed"}>
      <CuboidCollider
        rotation={[0, Math.PI / 2, 0]}
        args={[5, 1, 0.05]}
        position={[-5, 1, 0]}
      />
      <CuboidCollider
        rotation={[0, Math.PI / 2, 0]}
        args={[5, 1, 0.05]}
        position={[5, 1, 0]}
      />
      <CuboidCollider args={[5, 1, 0.05]} position={[0, 1, 5]} />
      <CuboidCollider args={[5, 1, 0.05]} position={[0, 1, -5]} />
    </RigidBody>
  );
};
export default CowPenMapBounding;
