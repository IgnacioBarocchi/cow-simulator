import {
  ExtendedAnimationClip,
  GLTFResult,
  loopableAnimationClips,
} from "./@types/Cow3DModelTypes";
import { FC, useEffect as onLoadEffect, useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";

import { Group } from "three";
import { StateValue } from "xstate";
import animationsByMachineStateMap from "./helper/animationByMachineStateMap";
import getAnimationClipMilliseconds from "../../../lib/getAnimationClipDuration";
import { useCowSimulatorStore } from "../../../store/store";

const Cow3DModel: FC<{ state: StateValue }> = ({ state }) => {
  const { setCow3DModelGroup } = useCowSimulatorStore((state) => ({
    setCow3DModelGroup: state.setCow3DModelGroup,
  }));

  const groupRef = useRef<Group>(null);

  const { nodes, materials, animations } = useGLTF(
    "/models/Cow.gltf"
  ) as GLTFResult;

  const { actions } = useAnimations<ExtendedAnimationClip>(
    animations as ExtendedAnimationClip[],
    groupRef
  );

  onLoadEffect(() => {
    if (groupRef?.current !== null || groupRef?.current !== undefined) {
      setCow3DModelGroup(groupRef.current!);
    }
  }, []);

  useEffect(() => {
    const availableAnimations = animationsByMachineStateMap?.get(state);
    const currentAnimation = availableAnimations
      ? availableAnimations[
          Math.floor(Math.random() * availableAnimations.length)
        ]
      : undefined;

    if (!actions || !currentAnimation || !actions[currentAnimation] || !state)
      return;

    if (loopableAnimationClips.includes(currentAnimation as string)) {
      actions[currentAnimation]?.reset().fadeIn(0.2).play();

      return () => {
        actions[currentAnimation]?.fadeOut(0.2);
      };
    } else {
      const secondsOfDeathAnimation = getAnimationClipMilliseconds(
        actions,
        currentAnimation
      );
      actions[currentAnimation]?.getClip().duration;
      actions[currentAnimation]?.reset().play();

      setTimeout(() => {
        actions[currentAnimation]?.stop();
      }, secondsOfDeathAnimation);
    }

    return () => {
      actions[currentAnimation]?.fadeOut(0.2);
    };
  }, [state]);

  return (
    <group ref={groupRef} dispose={null}>
      <group name="Scene">
        <group name="RootNode" scale={0.22}>
          <group
            name="AnimalArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Body} />
            <primitive object={nodes.IKBackLegL} />
            <primitive object={nodes.IKFrontLegL} />
            <primitive object={nodes.IKBackLegR} />
            <primitive object={nodes.IKFrontLegR} />
            <group name="Cow" receiveShadow castShadow>
              <skinnedMesh
                receiveShadow
                castShadow
                name="Cow_1"
                geometry={nodes.Cow_1.geometry}
                material={materials.Main}
                skeleton={nodes.Cow_1.skeleton}
              />
              <skinnedMesh
                receiveShadow
                castShadow
                name="Cow_2"
                geometry={nodes.Cow_2.geometry}
                material={materials.Main_Light}
                skeleton={nodes.Cow_2.skeleton}
              />
              <skinnedMesh
                receiveShadow
                castShadow
                name="Cow_3"
                geometry={nodes.Cow_3.geometry}
                material={materials.Muzzle}
                skeleton={nodes.Cow_3.skeleton}
              />
              <skinnedMesh
                receiveShadow
                castShadow
                name="Cow_4"
                geometry={nodes.Cow_4.geometry}
                material={materials.Hooves}
                skeleton={nodes.Cow_4.skeleton}
              />
              <skinnedMesh
                receiveShadow
                castShadow
                name="Cow_5"
                geometry={nodes.Cow_5.geometry}
                material={materials.Eye_Black}
                skeleton={nodes.Cow_5.skeleton}
              />
              <skinnedMesh
                receiveShadow
                castShadow
                name="Cow_6"
                geometry={nodes.Cow_6.geometry}
                material={materials.Eye_White}
                skeleton={nodes.Cow_6.skeleton}
              />
              <skinnedMesh
                receiveShadow
                castShadow
                name="Cow_7"
                geometry={nodes.Cow_7.geometry}
                material={materials.Horns}
                skeleton={nodes.Cow_7.skeleton}
              />
            </group>
          </group>
        </group>
        <mesh
          name="Baseboard"
          geometry={nodes.Baseboard.geometry}
          material={materials.Baseboard_material}
          scale={0.22}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/models/Cow.gltf");

export default Cow3DModel;
