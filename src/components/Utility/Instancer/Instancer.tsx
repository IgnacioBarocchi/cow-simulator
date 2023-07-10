import { FC, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    [nodeName: string]: Mesh;
  };
  materials: {
    [materialName: string]: MeshStandardMaterial;
  };
};

type InstancerProps = {
  numberOfInstances: number;
  url: string;
  columns: number;
  rows: number;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
};

const Instancer: FC<InstancerProps> = ({
  numberOfInstances,
  url,
  columns,
  rows,
  offsetX,
  offsetY,
  offsetZ,
}) => {
  const { nodes } = useGLTF(url) as GLTFResult;
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (groupRef.current === null) return;

    const group = groupRef.current;
    const instanceOffset = new Vector3(offsetX, offsetY, offsetZ);

    for (let i = 0; i < numberOfInstances; i++) {
      const instanceGroup = new Group();

      const column = i % columns;
      const row = Math.floor(i / columns);

      Object.keys(nodes).forEach((nodeName) => {
        const mesh = nodes[nodeName]?.clone();
        mesh.position.copy(instanceOffset);
        mesh.position.x += column * offsetX;
        mesh.position.z += row * offsetZ;
        instanceGroup.add(mesh);
      });

      group.add(instanceGroup);
    }
  }, []);

  return <group ref={groupRef} dispose={null} />;
};

export default Instancer;
