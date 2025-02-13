import { FC, forwardRef, lazy, Suspense } from "react";
import { ContactShadows, useGLTF } from "@react-three/drei";
import { StateValue } from "xstate";
import { GLTF } from "three-stdlib";

const BigModel = lazy(() => import("./BigModel"));

const Cow3DModel: FC<{ mesh3DInfo: GLTF }> = forwardRef(
  ({ mesh3DInfo }, groupRef) => {
    if (!mesh3DInfo) return null;

    const { nodes, materials } = mesh3DInfo;

    return (
      <group ref={groupRef} dispose={null} scale={0.22}>
        <group name="Scene">
          <group name="AnimalArmature">
            <primitive object={nodes.Body} />
            <primitive object={nodes.IKBackLegL} />
            <primitive object={nodes.IKFrontLegL} />
            <primitive object={nodes.IKBackLegR} />
            <primitive object={nodes.IKFrontLegR} />
            <primitive object={nodes.neutral_bone} />
            <Suspense>
              <BigModel />
            </Suspense>
          </group>
          <group
            name="Cow_Horn_base"
            position={[0, -45.509, 127.882]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    );
  }
);

useGLTF.preload("/models/cow_character2.glb");

export default Cow3DModel;
