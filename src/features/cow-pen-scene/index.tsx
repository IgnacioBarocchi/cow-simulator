import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { terrainLoadedAtom } from "../../store/store";
import { Ground3DModel } from "./models/ground";
import CowPenLights from "./FX/lights";
import { Fence3DModel } from "./models/fence";

import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Wall: THREE.Mesh;
    Fence: THREE.Mesh;
    Ground: THREE.Mesh;
  };
  materials: {
    ["Old Brick wall"]: THREE.MeshStandardMaterial;
    ["Rusted Steel"]: THREE.MeshStandardMaterial;
    ["Mud-2"]: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/newenv2.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        receiveShadow
        geometry={nodes.Wall.geometry}
        material={materials["Old Brick wall"]}
        position={[0, 0.582, -1.551]}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.Fence.geometry}
        material={materials["Rusted Steel"]}
        position={[0, 0.085, 0]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Ground.geometry}
        material={materials["Mud-2"]}
        position={[0, 0.163, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/newenv2.glb");
const CowPenScene = () => {
  const setTerrainLoaded = useSetAtom(terrainLoadedAtom);

  useEffect(() => {
    setTerrainLoaded(true);
  }, []);

  return (
    <>
      <RigidBody type={"fixed"} colliders={false}>
        <CuboidCollider friction={2} args={[5, 0, 5]} position={[0, 0, 0]} />
        <CuboidCollider args={[0, 2, 2]} position={[1.65, 1, 0]} />
        <CuboidCollider args={[0, 2, 2]} position={[-1.65, 1, 0]} />
        <CuboidCollider args={[2, 2, 0]} position={[0, 1, 1.65]} />
        <CuboidCollider args={[2, 2, 0]} position={[0, 1, -1.65]} />
        {/* <Ground3DModel /> */}
      </RigidBody>
      {/* <Fence3DModel /> */}
      <Model />
      <CowPenLights />
    </>
  );
};

export default CowPenScene;
