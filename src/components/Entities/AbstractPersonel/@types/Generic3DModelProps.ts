import { StateValue } from "xstate";

export interface Generic3DModelProps {
  state: StateValue;
  props: JSX.IntrinsicElements["group"];
}

export const NPCAnimationClips = {
  IDLE: ["Idle_Neutral", "Idle_Sword"],
  WALK: ["CharacterArmature|Walk"],
  PUNCH: ["CharacterArmature|Punch_Left", "CharacterArmature|Punch_Right"],
  KICK: ["CharacterArmature|Kick_Left", "CharacterArmature|Kick_Right"],
  INTERACT: ["CharacterArmature|Wave", "CharacterArmature|Interact"],
} as const;

export const NPCloopableAnimationClips = [
  "CharacterArmature|Walk",
  "CharacterArmature|Run",
];
