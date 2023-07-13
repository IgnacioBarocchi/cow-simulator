import { GLTF } from "three-stdlib";

export type GLTFResult = GLTF & {
  nodes: {
    Farmer_Feet_1: THREE.SkinnedMesh;
    Farmer_Feet_2: THREE.SkinnedMesh;
    Farmer_Pants: THREE.SkinnedMesh;
    Farmer_Body_1: THREE.SkinnedMesh;
    Farmer_Body_2: THREE.SkinnedMesh;
    Farmer_Body_3: THREE.SkinnedMesh;
    Farmer_Body_4: THREE.SkinnedMesh;
    Farmer_Head_1: THREE.SkinnedMesh;
    Farmer_Head_2: THREE.SkinnedMesh;
    Farmer_Head_3: THREE.SkinnedMesh;
    Farmer_Head_4: THREE.SkinnedMesh;
    Farmer_Head_5: THREE.SkinnedMesh;
    Root: THREE.Bone;
  };
  materials: {
    Brown2: THREE.MeshStandardMaterial;
    Brown: THREE.MeshStandardMaterial;
    LightBlue: THREE.MeshStandardMaterial;
    Skin: THREE.MeshStandardMaterial;
    Beige: THREE.MeshStandardMaterial;
    Eyebrows: THREE.MeshStandardMaterial;
    Red: THREE.MeshStandardMaterial;
    Eye: THREE.MeshStandardMaterial;
  };
};

export type ActionName =
  | "CharacterArmature|Death"
  | "CharacterArmature|Gun_Shoot"
  | "CharacterArmature|HitRecieve"
  | "CharacterArmature|HitRecieve_2"
  | "CharacterArmature|Idle"
  | "CharacterArmature|Idle_Gun"
  | "CharacterArmature|Idle_Gun_Pointing"
  | "CharacterArmature|Idle_Gun_Shoot"
  | "CharacterArmature|Idle_Neutral"
  | "CharacterArmature|Idle_Sword"
  | "CharacterArmature|Interact"
  | "CharacterArmature|Kick_Left"
  | "CharacterArmature|Kick_Right"
  | "CharacterArmature|Punch_Left"
  | "CharacterArmature|Punch_Right"
  | "CharacterArmature|Roll"
  | "CharacterArmature|Run"
  | "CharacterArmature|Run_Back"
  | "CharacterArmature|Run_Left"
  | "CharacterArmature|Run_Right"
  | "CharacterArmature|Run_Shoot"
  | "CharacterArmature|Sword_Slash"
  | "CharacterArmature|Walk"
  | "CharacterArmature|Wave";

export type GLTFActions = Record<ActionName, THREE.AnimationAction>;
