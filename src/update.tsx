import { context, useFrame } from "@react-three/fiber";
import { useAfterPhysicsStep } from "@react-three/rapier";
import useCameraOperator from "./hooks/useCameraOpeator";
import usePlayerMachine from "./hooks/usePlayerMachine";
import { input } from "./features/character/controller/input";
import useCharacterAnimations from "./hooks/useCharacterAnimations";
// import { Keys } from "../../../lib/keysMap";

export const Update = () => {
  const {
    state: {
      context: { mesh3DRef, rapierRigidBodyRef, actions, controller },
    },
    send,
  } = usePlayerMachine();
  const cameraOperator = useCameraOperator();
  useCharacterAnimations();
  useAfterPhysicsStep((api) => {
    controller?.physicsPostStep(api);
  });

  useFrame(({ camera }, delta) => {
    if (
      [mesh3DRef?.current, rapierRigidBodyRef?.current, actions].some((e) => !e)
    ) {
      return;
    }

    // cameraOperator.update(mesh3DRef.current);

    // const keys = getKeys() as unknown as Keys;
    // const numberOfKeysPressed = Object.values(keys).filter((key) => key).length;

    // send(
    //   numberOfKeysPressed > 0
    //     ? getMachineStateFromInputtedKeys(keys)
    //     : { type: "idle" }
    // );
    send({
      type: "UPDATE",
      input,
      timeStep: delta,
      camera,
    });
  });

  return null;
};
