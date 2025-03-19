import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

import { GLTF } from "three-stdlib";
import Hint3D from "../ui/hint-3d";
import { hint3DText } from "../../../constants/hint-data";
import { useGLTF } from "@react-three/drei";

// import { useSetAtom } from "jotai";

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

function FenceModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/compressed_1742262595500_fence.glb",
    true
  ) as GLTFResult;

  const mesh3DRef = useRef(null);
  useEffect(() => {
    mesh3DRef?.current?.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true; // Enable shadow casting
        child.receiveShadow = true; // Enable shadow casting
      }
    });
  }, [mesh3DRef]);
  return (
    <group {...props} dispose={null} ref={mesh3DRef}>
      <group
        position={[-0.01, 0.5, 1.47]}
        scale={0.01}
        castShadow
        receiveShadow
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1_Mat_0004.geometry}
          material={materials.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1_Mat_0004_1.geometry}
          material={materials["Material.003"]}
        />
      </group>
    </group>
  );
}

export function CowPen3DModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/newenv2.glb",
    true
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group>
        <Hint3D position={[-1.5, 1, 1.5]} index={1} info={hint3DText.fence} />
        {/* <mesh
          receiveShadow
          geometry={nodes.Wall.geometry}
          material={materials["Old Brick wall"]}
          position={[0, 0.582, -1.551]}
        /> */}
      </group>
      {/* <group>
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.Fence.geometry}
          material={materials["Rusted Steel"]}
          position={[0, 0.085, 0]}
        />
      </group> */}
      <FenceModel />
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
useGLTF.preload("/models/compressed_1742262595500_fence.glb");

const CowPenScene = () => {
  // const setTerrainLoaded = useSetAtom(terrainLoadedAtom);

  // useEffect(() => {
  //   // setTerrainLoaded(true);
  // }, []);

  return (
    <>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0, 2, 2]} position={[2, 1, 0]} />
        <CuboidCollider args={[0, 2, 2]} position={[-2, 1, 0]} />
        <CuboidCollider args={[2, 2, 0]} position={[0, 1, 1.4]} />
        <CuboidCollider args={[2, 2, 0]} position={[0, 1, -2.5]} />
      </RigidBody>
      <CowPen3DModel />
    </>
  );
};

export default CowPenScene;
