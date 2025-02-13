import {
  CuboidCollider as Bounding,
  RigidBody,
  CylinderCollider as Sensor,
} from "@react-three/rapier";
import { EntityNames, SensorNames } from "../../lib/object3DHelper";
import { FC } from "react";

import Cow3DModel from "./model/Cow3DModel";
import usePlayerInitializer from "../../hooks/usePlayerInitializer";
import { InputControls } from "./controller/input";
import { ContactShadows, PositionalAudio } from "@react-three/drei";
import { useControls } from "leva";
import walkSFX from "/sounds/Cow/step.mp3";
import { States } from "../../machines/PlayerMachine";

const Cow: FC<{ useOrbitControls: boolean }> = ({ useOrbitControls }) => {
  const {
    mesh3DRef,
    rapierRigidBodyRef,
    send,
    state: machineState,
    mesh3DInfo,
  } = usePlayerInitializer();
  // const { colliderSize, colliderPosition, restitution, friction } = useControls(
  //   {
  //     colliderSize: { value: [0.2, 0.5, 0.9], step: 0.01 },
  //     colliderPosition: { value: [0, 0.5, 0.2], step: 0.01 },
  //     restitution: { value: 0.5, min: 0, max: 1, step: 0.01 },
  //     friction: { value: 1, min: 0, max: 1, step: 0.01 },
  //   }
  // );
  return (
    <>
      <InputControls />
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

        {/* 
        {"colliderSize":}
        {"colliderPosition":} */}
        {/* <Bounding
          args={[0.13, 0.1399999999999997, 0.22999999999999948]}
          position={[0, 0.8600000000000001, 0.8600000000000002]}
        />
        <Bounding
          args={[0.2, 0.5, 0.059999999999999415]}
          position={[0, 0.5, -0.42000000000000015]}
        />
        <Bounding
          args={[0.2, 0.5, 0.049999999999999586]}
          position={[0, 0.5, 0.4000000000000002]}
        /> */}
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
{
  /* {[States.attackHeadbutt, States.attackKick].includes(
  // @ts-ignore
  machineState.value
) && (
  <CowHitbox
    orientation={orientation}
    state={machineState.value}
    send={send}
  />
)}
{machineState.matches(States.walk) && (
  <PositionalAudio
    load
    autoplay
    loop
    distance={10}
    url="/sounds/Cow/step.mp3"
  />
)} */
}

export default Cow;
// const [_, getKeys] = useKeyboardControls() as unknown as [null, () => Keys];
// const [orientation, setOrientation] = useState(Math.PI);

// useFrame((rootState, delta) => {
//   if (!rapierRigidBodyRef.current) return;
//   const keys = getKeys() as unknown as Keys;
//   const numberOfKeysPressed = Object.values(keys).filter((key) => key).length;

//   send(
//     numberOfKeysPressed > 0
//       ? getMachineStateFromInputtedKeys(keys)
//       : { type: "idle" }
//   );

//   const linearVelocityYaxis: number | undefined =
//     rapierRigidBodyRef.current?.linvel().y;
//   const impulse = getImpulse(
//     linearVelocityYaxis,
//     keys,
//     numberOfKeysPressed,
//     delta
//   );

//   rapierRigidBodyRef.current.setLinvel(impulse, false);

//   updateOrientation(orientation, setOrientation, keys);

//   const quaternionRotation = new Quaternion();
//   quaternionRotation.setFromEuler(new Euler(0, orientation, 0));
//   rapierRigidBodyRef.current.setRotation(quaternionRotation, false);

//   const cowVectorialPosition = rapierRigidBodyRef.current.translation();

//   if (!useOrbitControls) {
//     updateCameraMovement(
//       rootState,
//       cowVectorialPosition as unknown as Vector3
//     );
//   }
// });
