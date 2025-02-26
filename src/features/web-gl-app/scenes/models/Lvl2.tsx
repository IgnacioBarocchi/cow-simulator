import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube001: THREE.Mesh;
    Cube001_1: THREE.Mesh;
    Cube001_2: THREE.Mesh;
    Cube001_3: THREE.Mesh;
    Fence: THREE.Mesh;
    Milker: THREE.Mesh;
    Pipes: THREE.Mesh;
    milk: THREE.Mesh;
    tube: THREE.Mesh;
    poop: THREE.Mesh;
  };
  materials: {
    ["Old Wall procedural"]: THREE.MeshStandardMaterial;
    ["Procedural Metal With Imprfections"]: THREE.MeshStandardMaterial;
    ["Brushed Aluminium Metal"]: THREE.MeshStandardMaterial;
    ["Plastic Blue 19"]: THREE.MeshStandardMaterial;
    ["Procedural Rusty Painted Metal"]: THREE.MeshStandardMaterial;
    ["Default OBJ"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/lvl2.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group scale={[0.3, 1, 1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials["Anti-slip metal"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials["Old Wall procedural"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
          material={materials["Procedural Metal With Imprfections"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_3.geometry}
          material={materials["Brushed Aluminium Metal"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_4.geometry}
          material={materials["Plastic Blue 19"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fence.geometry}
        material={materials["Procedural Rusty Painted Metal"]}
        position={[-0.277, 0.012, -0.4]}
        scale={0.017}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Milker.geometry}
        material={materials["Brushed Aluminium Metal"]}
        position={[-0.028, 0.38, -0.311]}
        scale={0.017}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pipes.geometry}
        material={materials["Anti-slip metal"]}
        position={[0, -0.323, -0.759]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.022, 0.599, 0.022]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Milk.geometry}
        material={materials.Milk}
        position={[-0.047, 0.003, 0.248]}
        rotation={[0, -0.917, 0]}
        scale={0.073}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tube.geometry}
        material={materials["Plastic Blue 19"]}
        position={[-0.025, 0.257, -0.334]}
        scale={-0.023}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.poop.geometry}
        material={materials["Default OBJ"]}
        position={[0.044, 0, -0.551]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/lvl2.glb");
