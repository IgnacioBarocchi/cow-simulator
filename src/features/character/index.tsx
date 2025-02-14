import { CuboidCollider as Bounding, RigidBody } from "@react-three/rapier";
import { FC } from "react";
import { EntityNames } from "../../lib/object3DHelper";

import { PositionalAudio } from "@react-three/drei";
import usePlayerInitializer from "../../hooks/usePlayerInitializer";
import { States } from "../../machines/PlayerMachine";
import Cow3DModel from "./model/Cow3DModel";

const Cow: FC<{ useOrbitControls: boolean }> = ({ useOrbitControls }) => {
  const {
    mesh3DRef,
    rapierRigidBodyRef,
    send,
    state: machineState,
    mesh3DInfo,
  } = usePlayerInitializer();

  return (
    <>
      {/* <InputControls /> */}
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
      {machineState.matches(States.walk) && (
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
