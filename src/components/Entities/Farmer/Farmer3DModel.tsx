import * as THREE from "three";
import { FC, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTFActions, GLTFResult } from "./@types/Farmer3DModelTypes";
import {
  GenericNPC3DModelProps,
  NPCloopableAnimationClips,
} from "../AbstractPersonel/@types/GenericNPC3DModelTypes";
import NPCanimationsByMachineStateMap from "../AbstractPersonel/helper/NPCanimationsByMachineStateMap";
import getAnimationClipMilliseconds from "../../../lib/getAnimationClipDuration";

const Farmer3DModel: FC<GenericNPC3DModelProps> = ({ state, ...props }) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/models/Farmer.glb"
  ) as GLTFResult;
  // @ts-ignore
  const { actions } = useAnimations<GLTFActions>(animations, group);

  useEffect(() => {
    // @ts-ignore
    const availableAnimations = NPCanimationsByMachineStateMap?.get(state);
    const currentAnimation = availableAnimations
      ? availableAnimations[
          Math.floor(Math.random() * availableAnimations.length)
        ]
      : undefined;

    if (NPCloopableAnimationClips.includes(currentAnimation as string)) {
      // @ts-ignore
      actions[currentAnimation]?.reset().fadeIn(0.2).play();

      return () => {
        // @ts-ignore
        actions[currentAnimation]?.fadeOut(0.2);
      };
    } else {
      const secondsOfDeathAnimation = getAnimationClipMilliseconds(
        actions,
        currentAnimation
      );
      // @ts-ignore
      actions[currentAnimation]?.getClip().duration;
      // @ts-ignore
      actions[currentAnimation]?.reset().play();

      setTimeout(() => {
        // @ts-ignore
        actions[currentAnimation]?.stop();
      }, secondsOfDeathAnimation);
    }

    return () => {
      // @ts-ignore
      actions[currentAnimation]?.fadeOut(0.2);
    };
  }, [state]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Root} />
          </group>
          <group name="Farmer_Feet" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Farmer_Feet_1"
              geometry={nodes.Farmer_Feet_1.geometry}
              material={materials.Brown2}
              skeleton={nodes.Farmer_Feet_1.skeleton}
            />
            <skinnedMesh
              name="Farmer_Feet_2"
              geometry={nodes.Farmer_Feet_2.geometry}
              material={materials.Brown}
              skeleton={nodes.Farmer_Feet_2.skeleton}
            />
          </group>
          <skinnedMesh
            name="Farmer_Pants"
            geometry={nodes.Farmer_Pants.geometry}
            material={materials.LightBlue}
            skeleton={nodes.Farmer_Pants.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <group name="Farmer_Body" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Farmer_Body_1"
              geometry={nodes.Farmer_Body_1.geometry}
              material={materials.Brown}
              skeleton={nodes.Farmer_Body_1.skeleton}
            />
            <skinnedMesh
              name="Farmer_Body_2"
              geometry={nodes.Farmer_Body_2.geometry}
              material={materials.LightBlue}
              skeleton={nodes.Farmer_Body_2.skeleton}
            />
            <skinnedMesh
              name="Farmer_Body_3"
              geometry={nodes.Farmer_Body_3.geometry}
              material={materials.Skin}
              skeleton={nodes.Farmer_Body_3.skeleton}
            />
            <skinnedMesh
              name="Farmer_Body_4"
              geometry={nodes.Farmer_Body_4.geometry}
              material={materials.Beige}
              skeleton={nodes.Farmer_Body_4.skeleton}
            />
          </group>
          <group name="Farmer_Head" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Farmer_Head_1"
              geometry={nodes.Farmer_Head_1.geometry}
              material={materials.Skin}
              skeleton={nodes.Farmer_Head_1.skeleton}
            />
            <skinnedMesh
              name="Farmer_Head_2"
              geometry={nodes.Farmer_Head_2.geometry}
              material={materials.Beige}
              skeleton={nodes.Farmer_Head_2.skeleton}
            />
            <skinnedMesh
              name="Farmer_Head_3"
              geometry={nodes.Farmer_Head_3.geometry}
              material={materials.Eyebrows}
              skeleton={nodes.Farmer_Head_3.skeleton}
            />
            <skinnedMesh
              name="Farmer_Head_4"
              geometry={nodes.Farmer_Head_4.geometry}
              material={materials.Red}
              skeleton={nodes.Farmer_Head_4.skeleton}
            />
            <skinnedMesh
              name="Farmer_Head_5"
              geometry={nodes.Farmer_Head_5.geometry}
              material={materials.Eye}
              skeleton={nodes.Farmer_Head_5.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/Farmer.glb");

export default Farmer3DModel;
