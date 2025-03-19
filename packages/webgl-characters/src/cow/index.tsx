import {
  CuboidCollider as Bounding,
  CuboidColliderProps,
  RigidBody,
} from "@react-three/rapier";

import { PositionalAudio } from "@react-three/drei";
import { States } from "./types";
import { lazy } from "react";
import usePlayerInitializer from "./hooks/usePlayerInitializer";

const Cow3DModel = lazy(() => import("./model/v2/hollando-cow"));

const isWalking = (state: State) => {
  return state.matches(States.walk);
};

const modelProps = {
  v1: {
    args: [0.2, 0.5, 0.8],
    position: [0, 0.5, 0.2],
  },
  v2: {
    args: [0.2, 0.6, 1],
    position: [0, 0, 0],
  },
} as { [x: string]: Partial<CuboidColliderProps> };

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
      >
        <Bounding {...modelProps.v2} />
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
