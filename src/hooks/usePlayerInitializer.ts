import { cowLoadedAtom, inputAtom, playerMachineAtom } from "../store/store";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";

import { Character } from "../features/character/controller/Character";
import { Group } from "three";
import { RapierRigidBody } from "@react-three/rapier";
import usePlayerMachine from "./usePlayerMachine";
import { useThree } from "@react-three/fiber";

export default function usePlayerInitializer() {
  const { camera } = useThree();
  const mesh3DInfo = useGLTF("/models/cow_character2.glb");
  const mesh3DRef = useRef<Group>(null);
  const rapierRigidBodyRef = useRef<RapierRigidBody>(null);
  // const { state, send } = usePlayerMachine();
  const [state, send] = useAtom(playerMachineAtom);
  const { actions } = useAnimations<ExtendedAnimationClip>(
    mesh3DInfo.animations as ExtendedAnimationClip[],
    mesh3DRef
  );
  const setIsLoaded = useSetAtom(cowLoadedAtom);
  const input = useAtomValue(inputAtom)
  useEffect(() => {
    if (!mesh3DRef?.current || !rapierRigidBodyRef?.current || !input) {
      return;
    }

    mesh3DRef.current.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true; // Enable shadow casting
      }
    });


    send({
      type: "SET_CONTEXT",
      refs: {
        mesh3DRef,
        rapierRigidBodyRef,
      },
      actions,
      controller: new Character({
        model: mesh3DRef,
        orientation: [0, 0, 1],
        rigidbody: rapierRigidBodyRef,
        camera,
        input
      }),
    });
    setIsLoaded(true);
  }, [rapierRigidBodyRef, mesh3DRef]);

  return { mesh3DRef, rapierRigidBodyRef, send, state, mesh3DInfo };
}

// const effect = useCharacterAnimations(actions, mesh3DRef);
// useEffect(effect);
