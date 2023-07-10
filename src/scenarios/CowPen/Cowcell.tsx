import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cow_1: THREE.Mesh;
    Cow_2: THREE.Mesh;
    Cow_3: THREE.Mesh;
    Cow_4: THREE.Mesh;
    Cow_5: THREE.Mesh;
    Cow_6: THREE.Mesh;
    Cow_7: THREE.Mesh;
    foodcontainer: THREE.Mesh;
    Cylinder001: THREE.Mesh;
    Cylinder002: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cube002: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube004: THREE.Mesh;
    Cylinder003: THREE.Mesh;
    Cylinder004: THREE.Mesh;
    Cylinder005: THREE.Mesh;
    Cylinder006: THREE.Mesh;
    Cylinder007: THREE.Mesh;
    Cylinder008: THREE.Mesh;
    Cylinder009: THREE.Mesh;
    Cylinder010: THREE.Mesh;
    Cylinder011: THREE.Mesh;
    Cylinder012: THREE.Mesh;
    Cylinder013: THREE.Mesh;
    Cylinder014: THREE.Mesh;
    Cube005: THREE.Mesh;
    Cube006: THREE.Mesh;
  };
  materials: {
    Main: THREE.MeshStandardMaterial;
    Main_Light: THREE.MeshStandardMaterial;
    Muzzle: THREE.MeshStandardMaterial;
    Hooves: THREE.MeshStandardMaterial;
    Eye_Black: THREE.MeshStandardMaterial;
    Eye_White: THREE.MeshStandardMaterial;
    Horns: THREE.MeshStandardMaterial;
    Plastic: THREE.MeshStandardMaterial;
    metal: THREE.MeshStandardMaterial;
    Column: THREE.MeshStandardMaterial;
  };
};

export default function Cowcell(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/Cowcell.gltf") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.foodcontainer.geometry}
        material={materials.Plastic}
        position={[0, 0.06, 0.79]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.06, 0.65, 0.06]}
      />
      <mesh
        geometry={nodes.Cylinder001.geometry}
        material={materials.metal}
        position={[0.33, 0.33, 0.52]}
        rotation={[1.55, 0, -1.58]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder002.geometry}
        material={materials.metal}
        position={[0.33, 0.78, 0.82]}
        rotation={[1.55, 0, -1.58]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cube001.geometry}
        material={materials.Column}
        position={[0.6, 0.23, 0.52]}
        scale={[0.04, 0.24, 0.04]}
      />
      <mesh
        geometry={nodes.Cube002.geometry}
        material={materials.Column}
        position={[-0.61, 0.23, 0.52]}
        scale={[0.04, 0.24, 0.04]}
      />
      <mesh
        geometry={nodes.Cube003.geometry}
        material={materials.Column}
        position={[1.97, 0.23, 0.52]}
        scale={[0.04, 0.24, 0.04]}
      />
      <mesh
        geometry={nodes.Cube004.geometry}
        material={materials.Column}
        position={[-1.97, 0.23, 0.52]}
        scale={[0.04, 0.24, 0.04]}
      />
      <mesh
        geometry={nodes.Cylinder003.geometry}
        material={nodes.Cylinder003.material}
        position={[0.33, 0.33, 0.52]}
        rotation={[1.55, 0, -1.58]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder004.geometry}
        material={materials.metal}
        position={[0.33, 0.52, 0.57]}
        rotation={[1.55, 0, -1.58]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder005.geometry}
        material={materials.metal}
        position={[2.92, 0.52, 0.57]}
        rotation={[1.55, 0, -1.58]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder006.geometry}
        material={materials.metal}
        position={[1.97, 0.33, -1.81]}
        rotation={[1.57, 0.02, 3.13]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder007.geometry}
        material={materials.metal}
        position={[1.97, 0.52, -1.76]}
        rotation={[1.57, 0.02, 3.13]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder008.geometry}
        material={materials.metal}
        position={[1.97, 0.77, -1.51]}
        rotation={[1.57, 0.02, 3.13]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder009.geometry}
        material={materials.metal}
        position={[-1.98, 0.33, -1.81]}
        rotation={[1.57, 0.02, 3.13]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder010.geometry}
        material={materials.metal}
        position={[-1.98, 0.52, -1.76]}
        rotation={[1.57, 0.02, 3.13]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder011.geometry}
        material={materials.metal}
        position={[-1.98, 0.77, -1.51]}
        rotation={[1.57, 0.02, 3.13]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder012.geometry}
        material={materials.metal}
        position={[-1.8, 0.33, -1.98]}
        rotation={[1.59, 0, 1.56]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder013.geometry}
        material={materials.metal}
        position={[-1.74, 0.52, -1.98]}
        rotation={[1.59, 0, 1.56]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder014.geometry}
        material={materials.metal}
        position={[-1.5, 0.77, -1.98]}
        rotation={[1.59, 0, 1.56]}
        scale={[0.03, 0.65, 0.03]}
      />
      <mesh
        geometry={nodes.Cube005.geometry}
        material={materials.Column}
        position={[-1.97, 0.23, -1.99]}
        scale={[0.04, 0.24, 0.04]}
      />
      <mesh
        geometry={nodes.Cube006.geometry}
        material={materials.Column}
        position={[1.98, 0.23, -1.99]}
        scale={[0.04, 0.24, 0.04]}
      />
    </group>
  );
}

useGLTF.preload("/models/Cowcell.gltf");
