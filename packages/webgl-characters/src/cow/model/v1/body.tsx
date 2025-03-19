import { useGLTF } from "@react-three/drei";

const BigModel = () => {
  const { nodes, materials } = useGLTF("/models/cow_character2.glb");

  return (
    <group name="DAZHorse2Shape">
      <skinnedMesh
        castShadow
        name="DAZHorse2"
        geometry={nodes.DAZHorse2.geometry}
        material={materials["1Hoof"]}
        skeleton={nodes.DAZHorse2.skeleton}
      />
      <skinnedMesh
        castShadow
        name="DAZHorse2_1"
        geometry={nodes.DAZHorse2_1.geometry}
        material={materials["1Coat"]}
        skeleton={nodes.DAZHorse2_1.skeleton}
      />
      <skinnedMesh
        castShadow
        name="DAZHorse2_2"
        geometry={nodes.DAZHorse2_2.geometry}
        material={materials["2LIris"]}
        skeleton={nodes.DAZHorse2_2.skeleton}
      />
      <skinnedMesh
        castShadow
        name="DAZHorse2_3"
        geometry={nodes.DAZHorse2_3.geometry}
        material={materials["2LPupil"]}
        skeleton={nodes.DAZHorse2_3.skeleton}
      />
      <skinnedMesh
        castShadow
        name="DAZHorse2_4"
        geometry={nodes.DAZHorse2_4.geometry}
        material={materials["2RIris"]}
        skeleton={nodes.DAZHorse2_4.skeleton}
      />
      <skinnedMesh
        castShadow
        name="DAZHorse2_5"
        geometry={nodes.DAZHorse2_5.geometry}
        material={materials["2RPupil"]}
        skeleton={nodes.DAZHorse2_5.skeleton}
      />
      <skinnedMesh
        castShadow
        name="DAZHorse2_6"
        geometry={nodes.DAZHorse2_6.geometry}
        material={materials["1Lacrimal"]}
        skeleton={nodes.DAZHorse2_6.skeleton}
      />
      <skinnedMesh
        castShadow
        name="DAZHorse2_7"
        geometry={nodes.DAZHorse2_7.geometry}
        material={materials["3Head"]}
        skeleton={nodes.DAZHorse2_7.skeleton}
      />
      <skinnedMesh
        castShadow
        name="DAZHorse2_8"
        geometry={nodes.DAZHorse2_8.geometry}
        material={materials["3Nostril"]}
        skeleton={nodes.DAZHorse2_8.skeleton}
      />
      <skinnedMesh
        castShadow
        name="DAZHorse2_9"
        geometry={nodes.DAZHorse2_9.geometry}
        material={materials["3EyeSocket"]}
        skeleton={nodes.DAZHorse2_9.skeleton}
      />
      <skinnedMesh
        castShadow
        name="DAZHorse2_10"
        geometry={nodes.DAZHorse2_10.geometry}
        material={materials["3Ear"]}
        skeleton={nodes.DAZHorse2_10.skeleton}
      />
      <skinnedMesh
        castShadow
        name="DAZHorse2_11"
        geometry={nodes.DAZHorse2_11.geometry}
        material={materials["3InnerEar"]}
        skeleton={nodes.DAZHorse2_11.skeleton}
      />
    </group>
  );
};

export default BigModel;
