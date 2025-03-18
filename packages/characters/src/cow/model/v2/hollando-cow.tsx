import { FC, ForwardedRef, forwardRef } from "react";

import { GLTF } from "three-stdlib";
import { Group } from "three";
import { useGLTF } from "@react-three/drei";

const Cow3DModel: FC<{ mesh3DInfo: GLTF }> = forwardRef(
  ({ mesh3DInfo }, groupRef: ForwardedRef<Group>) => {
    if (!mesh3DInfo) return null;

    const { nodes, materials } = mesh3DInfo;

    return (
      <group ref={groupRef} dispose={null} scale={0.025}>
        <group name="Scene">
          <group name="rig" rotation={[Math.PI / 2, 0, 0]}>
            <primitive object={nodes.body} />
            <primitive object={nodes.neutral_bone} />
            <skinnedMesh
              name="cow_simple_all"
              geometry={nodes.cow_simple_all.geometry}
              material={materials["material43.003"]}
              skeleton={nodes.cow_simple_all.skeleton}
            />
          </group>
        </group>
      </group>
    );
  }
);

useGLTF.preload("/models/cow-character-2.glb");

export default Cow3DModel;
