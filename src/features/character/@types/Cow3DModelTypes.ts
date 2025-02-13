import { Bone, Mesh, MeshStandardMaterial, SkinnedMesh } from "three";

import { GLTF } from "three-stdlib";

export type GLTFResult = GLTF & {
  nodes: {
    Cube003: Mesh;
    Cube003_1: Mesh;
    Cylinder: Mesh;
    Cow_1: SkinnedMesh;
    Cow_2: SkinnedMesh;
    Cow_3: SkinnedMesh;
    Cow_4: SkinnedMesh;
    Cow_5: SkinnedMesh;
    Cow_6: SkinnedMesh;
    Cow_7: SkinnedMesh;
    Baseboard: Mesh;
    Body: Bone;
    IKBackLegL: Bone;
    IKFrontLegL: Bone;
    IKBackLegR: Bone;
    IKFrontLegR: Bone;
  };
  materials: {
    ["Material.002"]: MeshStandardMaterial;
    ["Material.001"]: MeshStandardMaterial;
    Main: MeshStandardMaterial;
    Main_Light: MeshStandardMaterial;
    Muzzle: MeshStandardMaterial;
    Hooves: MeshStandardMaterial;
    Eye_Black: MeshStandardMaterial;
    Eye_White: MeshStandardMaterial;
    Horns: MeshStandardMaterial;
    Baseboard_material: MeshStandardMaterial;
  };
};

export type ModelAnimationClipName =
  | "AnimalArmature|Attack_Headbutt"
  | "AnimalArmature|Attack_Kick"
  | "AnimalArmature|Death"
  | "AnimalArmature|Eating"
  | "AnimalArmature|Gallop"
  | "AnimalArmature|Gallop_Jump"
  | "AnimalArmature|Idle_2"
  | "AnimalArmature|Idle"
  | "AnimalArmature|Idle_Headlow"
  | "AnimalArmature|Idle_HitReact_Left"
  | "AnimalArmature|Idle_HitReact_Right"
  | "AnimalArmature|Jump_toIdle"
  | "AnimalArmature|Walk";

export type GLTFActions = Record<ModelAnimationClipName, THREE.AnimationAction>;

export const AnimationClips = {
  ATTACK_HEADBUTT: ["AnimalArmature|Attack_Headbutt"],
  ATTACK_KICK: ["AnimalArmature|Attack_Kick"],
  DEATH: ["AnimalArmature|Death"],
  EATING: ["AnimalArmature|Eating"],
  GALLOP: ["AnimalArmature|Gallop"],
  IDLE: [
    "AnimalArmature|Idle",
    "AnimalArmature|Idle_2",
    "AnimalArmature|Idle_Headlow",
  ],
  IDLE_HITREACT: ["AnimalArmature|Idle_HitReact_Left", "Idle_HitReact_Right"],
  GALLOP_JUMP: ["AnimalArmature|Gallop_Jump"],
  JUMP_TOIDLE: ["AnimalArmature|Jump_toIdle"],
  WALK: ["AnimalArmature|Walk"],
} as const;

export const loopableAnimationClips: Readonly<string[]> = [
  ...AnimationClips.IDLE,
  ...AnimationClips.WALK,
  ...AnimationClips.GALLOP,
];

export type AnimationClip = keyof typeof AnimationClips;
export type ExtendedAnimationClip = THREE.AnimationClip & GLTFActions;
