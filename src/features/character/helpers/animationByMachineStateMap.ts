import {
  AnimationClips,
  ModelAnimationClipName,
} from "../@types/Cow3DModelTypes";
import { StateValue } from "xstate";

const {
  IDLE,
  ATTACK_HEADBUTT,
  ATTACK_KICK,
  EATING,
  GALLOP,
  IDLE_HITREACT,
  WALK,
  DEATH,
  GALLOP_JUMP,
} = AnimationClips;

const animationsByMachineStateMap = new Map<
  StateValue,
  | ModelAnimationClipName[]
  | (typeof AnimationClips)[keyof typeof AnimationClips]
>(
  Object.entries({
    idle: IDLE,
    attackHeadbutt: ATTACK_HEADBUTT,
    attackKick: ATTACK_KICK,
    eating: EATING,
    gallop: GALLOP,
    idleHitReact: IDLE_HITREACT,
    walk: WALK,
    death: DEATH,
    gallopJump: GALLOP_JUMP,
  })
);

export default animationsByMachineStateMap;
