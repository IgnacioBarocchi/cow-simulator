import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

// Atom to store the loaded GLTF model
const mesh3DInfoAtom = atomWithStorage("mesh3DInfo", null);

export function useMesh3DInfoStore() {
  const [mesh3DInfo, setMesh3DInfo] = useAtom(mesh3DInfoAtom);
  const gltf = useGLTF("/models/cow_character.glb"); // Load the model

  useEffect(() => {
    if (!mesh3DInfo) {
      setMesh3DInfo(gltf); // Save to Jotai state only once
    }
  }, [mesh3DInfo, gltf, setMesh3DInfo]);

  if (mesh3DInfo) {
    return { mesh3DInfo };
  }

  return { mesh3DInfo: gltf };
}
