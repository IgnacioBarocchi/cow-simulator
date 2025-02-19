import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";

import { input } from "./features/character/controller/input-controls";
import { useAfterPhysicsStep } from "@react-three/rapier";
import useCharacterAnimations from "./hooks/useCharacterAnimations";
import { useFrame } from "@react-three/fiber";
import usePlayerMachine from "./hooks/usePlayerMachine";

const createWorker = createWorkerFactory(() => import("./worker"));

export const Update = () => {
  const worker = useWorker(createWorker);

  const {
    state: {
      context: { mesh3DRef, rapierRigidBodyRef, actions, controller },
    },
    send,
  } = usePlayerMachine();
  useCharacterAnimations();
  useAfterPhysicsStep(async (api) => {
    await worker.updatePlayerVelocity(controller, api);
  });

  useFrame(({ camera }, delta) => {
    if (
      [mesh3DRef?.current, rapierRigidBodyRef?.current, actions].some((e) => !e)
    ) {
      return;
    }

    send({
      type: "UPDATE",
      input,
      timeStep: delta,
      camera,
    });
  });

  return null;
};

// cameraOperator.update(mesh3DRef.current);

// const keys = getKeys() as unknown as Keys;
// const numberOfKeysPressed = Object.values(keys).filter((key) => key).length;

// send(
//   numberOfKeysPressed > 0
//     ? getMachineStateFromInputtedKeys(keys)
//     : { type: "idle" }
// );
