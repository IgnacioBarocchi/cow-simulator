import { useGLTF } from "@react-three/drei";
import { myPersistentAtom } from "../store/store";

export default function useCashedDMesh() {
  const [data, setData] = useAtom(myPersistentAtom);

  const mesh3DInfo = useGLTF("/models/cow_character.glb");
}
