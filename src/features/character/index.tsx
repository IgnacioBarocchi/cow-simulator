import { PositionalAudio } from "@react-three/drei";
import { CuboidCollider as Bounding, RigidBody } from "@react-three/rapier";
import { lazy } from "react";
import usePlayerInitializer from "../../hooks/usePlayerInitializer";
import { EntityNames } from "../../lib/object3DHelper";
import { States } from "../../machines/PlayerMachine";

const Cow3DModel = lazy(() => import("./model/Cow3DModel"));

const isWalking = (m) => {
  return m.matches(States.walk);
};

const Cow = () => {
  const {
    mesh3DRef,
    rapierRigidBodyRef,
    state: machineState,
    mesh3DInfo,
  } = usePlayerInitializer();

  return (
    <>
      <RigidBody
        position={[0, 0, 0]}
        lockRotations={true}
        colliders={false}
        ref={rapierRigidBodyRef}
        restitution={0.5}
        friction={1}
        name={EntityNames.COW}
      >
        <Bounding args={[0.2, 1, 1.2]} position={[0, 1, -0.1]} />
        <Cow3DModel ref={mesh3DRef} mesh3DInfo={mesh3DInfo} />
      </RigidBody>
      {isWalking(machineState) && (
        <PositionalAudio
          load
          autoplay
          loop
          distance={1}
          url="/sounds/Cow/step.mp3"
        />
      )}
    </>
  );
};

export default Cow;
