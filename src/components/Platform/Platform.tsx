import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { Cone, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { terrainLoadedAtom } from "../../store/store";
import VolumetricCloudMaterial from "../../features/shaders/clouds";

type GLTFResult = GLTF & {
  nodes: {
    fence: THREE.Mesh;
    Circle: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshBasicMaterial;
    ["Mud-2"]: THREE.MeshBasicMaterial;
  };
  animations: GLTFAction[];
};

const Platform = () => {
  const { nodes, materials } = useGLTF("/models/cow_pen.glb") as GLTFResult;
  const setTerrainLoaded = useSetAtom(terrainLoadedAtom);

  useEffect(() => {
    setTerrainLoaded(true);
  }, []);

  return (
    <>
      <group dispose={null} scale={0.22}>
        <group
          position={[1.523, -0.582, -8.183]}
          rotation={[1.792, 0, Math.PI / 2]}
          scale={0.025}
        >
          <mesh
            geometry={nodes.Mesh.geometry}
            material={materials["Material.001"]}
          />
          <mesh geometry={nodes.Mesh_1.geometry} material={materials.light} />
        </group>
        <mesh
          geometry={nodes.fence.geometry}
          material={materials.Material}
          position={[7.645, 0.169, 7.613]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.175}
        />

        <RigidBody colliders={false} type={"fixed"} friction={10}>
          <CuboidCollider args={[0.05, 2, 8]} position={[8, 1, 0]} />
          <CuboidCollider args={[0.05, 2, 8]} position={[-8, 1, 0]} />
          <CuboidCollider args={[8, 2, 0.05]} position={[1, 1, -8]} />
          <CuboidCollider args={[8, 2, 0.05]} position={[1, 1, 8]} />
          <CuboidCollider args={[10, 0, 10]} position={[0, 0, 0]} />
          <mesh
            geometry={nodes.ground.geometry}
            material={materials["Mud-2"]}
            scale={12.488}
          />
        </RigidBody>
      </group>

      <mesh scale={1} position={[0.32, 1, -1.1]}>
        <sphereGeometry args={[1, 16, 16]} />
        {/* <Cone rotation={[-Math.PI / 2, 0, 0]} /> */}
        <VolumetricCloudMaterial
          scale={1}
          opacity={0.02}
          threshold={0.8}
          range={0.2}
        />
      </mesh>
    </>
  );
};

export default Platform;

useGLTF.preload("/models/cow_pen.glb");
