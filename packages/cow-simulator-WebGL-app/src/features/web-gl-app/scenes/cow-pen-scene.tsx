import { CuboidCollider, RigidBody } from "@react-three/rapier";

import { GLTF } from "three-stdlib";
import Hint3D from "../ui/hint-3d";
import { hint3DText } from "../../../constants/hint-data";
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useSetAtom } from "jotai";

// import { terrainLoadedAtom } from "../../../store/store";

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

export function CowPen3DModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/newenv2.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group>
        <Hint3D position={[-1.5, 1, 1.5]} index={1} info={hint3DText.fence} />
        <mesh
          receiveShadow
          geometry={nodes.Wall.geometry}
          material={materials["Old Brick wall"]}
          position={[0, 0.582, -1.551]}
        />
      </group>
      <group>
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.Fence.geometry}
          material={materials["Rusted Steel"]}
          position={[0, 0.085, 0]}
        />
      </group>
      <group>
        <Hint3D position={[3, 0, 1]} index={3} info={hint3DText.mud} />
        <mesh
          receiveShadow
          geometry={nodes.Ground.geometry}
          material={materials["Mud-2"]}
          position={[0, 0.163, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/newenv2.glb");
const CowPenScene = () => {
  // const setTerrainLoaded = useSetAtom(terrainLoadedAtom);

  // useEffect(() => {
  //   // setTerrainLoaded(true);
  // }, []);

  return (
    <>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0, 2, 2]} position={[1.65, 1, 0]} />
        <CuboidCollider args={[0, 2, 2]} position={[-1.65, 1, 0]} />
        <CuboidCollider args={[2, 2, 0]} position={[0, 1, 1.65]} />
        <CuboidCollider args={[2, 2, 0]} position={[0, 1, -1.65]} />
      </RigidBody>
      <CowPen3DModel />
    </>
  );
};

export default CowPenScene;
