import { useGLTF, PositionalAudio } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import ambientSFXAsset from "/sounds/ambient.mp3";
import ambientSFXAsset2 from "/sounds/ambient-layer-2.mp3";

type GLTFResult = GLTF & {
  nodes: {
    ground: THREE.Mesh;
  };
  materials: {
    ["Mud-2"]: THREE.MeshStandardMaterial;
  };
};

export function Ground3DModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/platform.glb") as GLTFResult;
  return (
    <group {...props} dispose={null} scale={[0.4, 0.22, 0.4]}>
      <mesh
        receiveShadow
        geometry={nodes.ground.geometry}
        material={materials["Mud-2"]}
        position={[0, -0.374, 0]}
      />
      <PositionalAudio
        load
        autoplay
        loop
        distance={0.025}
        url={ambientSFXAsset}
      />
      <PositionalAudio
        load
        autoplay
        loop
        distance={0.025}
        url={ambientSFXAsset2}
      />
    </group>
  );
}

useGLTF.preload("/models/platform.glb");
