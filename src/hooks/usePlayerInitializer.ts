import { Group } from "three";
import usePlayerMachine from "./usePlayerMachine";
import { useEffect, useRef } from "react";
import { RapierRigidBody } from "@react-three/rapier";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Character } from "../features/character/controller/Character";
import { useThree } from "@react-three/fiber";
import { useSetAtom } from "jotai";
import { cowLoadedAtom } from "../store/store";

export default function usePlayerInitializer() {
  const { camera } = useThree();
  const mesh3DInfo = useGLTF("/models/cow_character2.glb");
  const mesh3DRef = useRef<Group>(null);
  const rapierRigidBodyRef = useRef<RapierRigidBody>(null);
  const { state, send } = usePlayerMachine();
  const { actions } = useAnimations<ExtendedAnimationClip>(
    mesh3DInfo.animations as ExtendedAnimationClip[],
    mesh3DRef
  );
  const setIsLoaded = useSetAtom(cowLoadedAtom);

  useEffect(() => {
    if (!mesh3DRef?.current || !rapierRigidBodyRef?.current) {
      console.log("no hay");
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
      }),
    });
    setIsLoaded(true);
  }, [rapierRigidBodyRef, mesh3DRef]);

  return { mesh3DRef, rapierRigidBodyRef, send, state, mesh3DInfo };
}

// const effect = useCharacterAnimations(actions, mesh3DRef);
// useEffect(effect);
