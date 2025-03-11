import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";
import { inputAtom, playerMachineAtom } from "../../state/atoms";
import { useAtom, useAtomValue } from "jotai";

import { useAfterPhysicsStep } from "@react-three/rapier";
import useCharacterAnimations from "../../hooks/useCharacterAnimations";
import { useFrame } from "@react-three/fiber";

const createWorker = createWorkerFactory(
  () => import("../../workers/worker.js")
);

const Update = () => {
  const worker = useWorker(createWorker);
  const input = useAtomValue(inputAtom);

  const [
    {
      context: { mesh3DRef, rapierRigidBodyRef, actions, controller },
    },
    send,
  ] = useAtom(playerMachineAtom);

  useCharacterAnimations();
  useAfterPhysicsStep(async (api) => {
    await worker.updatePlayerVelocity(controller, api);
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

export default Update;
