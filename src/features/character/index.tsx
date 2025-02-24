import { CuboidCollider as Bounding, RigidBody } from "@react-three/rapier";

import { EntityNames } from "../../lib/object3DHelper";
import { PositionalAudio } from "@react-three/drei";
import { States } from "../../machines/PlayerMachine";
import { lazy } from "react";
import usePlayerInitializer from "../../hooks/usePlayerInitializer";

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
        <Bounding args={[0.2, 0.5, 0.8]} position={[0, 0.5, 0.2]} />
        <Cow3DModel ref={mesh3DRef} mesh3DInfo={mesh3DInfo} />
      </RigidBody>
      {isWalking(machineState) && (
        <PositionalAudio
          load
          autoplay
          loop
          distance={30}
          url="/sounds/Cow/step.mp3"
        />
      )}
    </>
  );
};

export default Cow;
