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
  | "Attack_Headbutt"
  | "Attack_Kick"
  | "Death"
  | "Eating"
  | "Gallop"
  | "Gallop_Jump"
  | "Idle_2"
  | "Idle"
  | "Idle_Headlow"
  | "Idle_HitReact_Left"
  | "Idle_HitReact_Right"
  | "Jump_toIdle"
  | "Walk";

export type GLTFActions = Record<ModelAnimationClipName, THREE.AnimationAction>;

export const AnimationClips = {
  ATTACK_HEADBUTT: ["Attack_Headbutt"],
  ATTACK_KICK: ["Attack_Kick"],
  DEATH: ["Death"],
  EATING: ["Eating"],
  GALLOP: ["Gallop"],
  IDLE: ["Idle", "Idle_2", "Idle_Headlow"],
  IDLE_HITREACT: ["Idle_HitReact_Left", "Idle_HitReact_Right"],
  GALLOP_JUMP: ["Gallop_Jump"],
  JUMP_TOIDLE: ["Jump_toIdle"],
  WALK: ["Walk"],
} as const;

export const loopableAnimationClips: Readonly<string[]> = [
  ...AnimationClips.IDLE,
  ...AnimationClips.WALK,
  ...AnimationClips.GALLOP,
];

export type AnimationClip = keyof typeof AnimationClips;
export type ExtendedAnimationClip = THREE.AnimationClip & GLTFActions;
