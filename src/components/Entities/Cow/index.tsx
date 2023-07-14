import {
  CuboidCollider as Bounding,
  RapierRigidBody,
  RigidBody,
  CylinderCollider as Sensor,
} from "@react-three/rapier";
import CowMachine, { States } from "../../../machines/CowMachine";
import { EntityNames, SensorNames } from "../../../lib/object3DHelper";
import { Euler, Quaternion, Vector3 } from "three";
import { FC, useRef, useState } from "react";
import { PositionalAudio, useKeyboardControls } from "@react-three/drei";

import Cow3DModel from "./Cow3DModel";
import CowHitbox from "./CowHitbox";
import { Keys } from "../../../lib/keysMap";
import getImpulse from "./helper/getImpulse";
import getMachineStateFromInputtedKeys from "./helper/getMachineStateFromInputtedKeys";
import updateCameraMovement from "./helper/updateCameraMovement";
import updateOrientation from "./helper/updateOrientation";
import { useFrame } from "@react-three/fiber";
import { useMachine } from "@xstate/react";

const Cow: FC<{ useOrbitControls: boolean }> = ({ useOrbitControls }) => {
  const cowBody = useRef<RapierRigidBody>(null);
  // todo orientation with signals
  const [orientation, setOrientation] = useState(Math.PI);
  const [_, getKeys] = useKeyboardControls() as unknown as [null, () => Keys];
  const [machineState, send] = useMachine(CowMachine);

  useFrame((rootState, delta) => {
    if (!cowBody.current) return;
    const keys = getKeys() as unknown as Keys;
    const numberOfKeysPressed = Object.values(keys).filter((key) => key).length;

    send(
      numberOfKeysPressed > 0 ? getMachineStateFromInputtedKeys(keys) : "idle"
    );

    const linearVelocityYaxis: number | undefined = cowBody.current?.linvel().y;
    const impulse = getImpulse(
      linearVelocityYaxis,
      keys,
      numberOfKeysPressed,
      delta
    );

    cowBody.current.setLinvel(impulse, false);

    updateOrientation(orientation, setOrientation, keys);

    const quaternionRotation = new Quaternion();
    quaternionRotation.setFromEuler(new Euler(0, orientation, 0));
    cowBody.current.setRotation(quaternionRotation, false);

    const cowVectorialPosition = cowBody.current.translation();

    if (!useOrbitControls) {
      updateCameraMovement(
        rootState,
        cowVectorialPosition as unknown as Vector3
      );
    }
  });

  return (
    <RigidBody
      lockRotations={true}
      colliders={false}
      ref={cowBody}
      restitution={0.5}
      friction={1}
      density={100}
      name={EntityNames.COW}
    >
      <Bounding args={[0.2, 0.5, 0.9]} position={[0, 0.5, 0.2]} />
      <Sensor
        name={SensorNames.COW_SENSOR}
        args={[0.2, 1.5]}
        position={[0, 0.5, 0]}
        sensor
      />
      <Cow3DModel state={machineState.value} />
      {[States.attackHeadbutt, States.attackKick].includes(
        // @ts-ignore
        machineState.value
      ) && <CowHitbox orientation={orientation} state={machineState.value} />}
      {machineState.matches(States.walk) && (
        <PositionalAudio
          load
          autoplay
          loop
          distance={10}
          url="/sounds/Cow/step.mp3"
        />
      )}
    </RigidBody>
  );
};

export default Cow;
