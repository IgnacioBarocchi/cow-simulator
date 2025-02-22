import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";
import { inputAtom, playerMachineAtom } from "./store/store";
import { useAtom, useAtomValue } from "jotai";

import { useAfterPhysicsStep } from "@react-three/rapier";
import useCharacterAnimations from "./hooks/useCharacterAnimations";
import { useFrame } from "@react-three/fiber";

// const createWorker = createWorkerFactory(() => import("./worker"));

export const Update = () => {
  // const worker = useWorker(createWorker);
  const input = useAtomValue(inputAtom);

  const [
    {
      context: { mesh3DRef, rapierRigidBodyRef, actions, controller },
    },
    send,
  ] = useAtom(playerMachineAtom); //usePlayerMachine();

  useCharacterAnimations();
  useAfterPhysicsStep(async (api) => {
    controller?.physicsPostStep(api);
    // await worker.updatePlayerVelocity(controller, api);
  });

  useFrame(({ camera }, delta) => {
    // console.log(input);
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
