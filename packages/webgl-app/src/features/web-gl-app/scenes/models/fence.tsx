import { useGLTF } from "@react-three/drei";
import Hint3D from "../../ui/hint-3d";

export function Fence3DModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/fence.glb") as GLTFResult;
  return (
    <>
      <group {...props} dispose={null}>
        <Hint3D />
        <mesh
          scale={0.22}
          castShadow
          geometry={nodes.fence.geometry}
          material={materials.Material}
          position={[7.645, 0.169, 7.613]}
          rotation={[Math.PI, 0, Math.PI]}
          // emissiveIntensity={2}
          toneMapped={false}
        />
      </group>
    </>
  );
}

useGLTF.preload("/models/fence.glb");
