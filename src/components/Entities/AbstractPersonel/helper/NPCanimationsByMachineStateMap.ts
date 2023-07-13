import { StateValue } from "xstate";
import { NPCAnimationClips } from "../@types/Generic3DModelProps";

const { IDLE, WALK, PUNCH, KICK, INTERACT } = NPCAnimationClips;

const NPCanimationsByMachineStateMap = new Map<StateValue, any>(
  Object.entries({
    idle: IDLE,
    walk: WALK,
    punch: PUNCH,
    kick: KICK,
    interact: INTERACT,
  })
);

export default NPCanimationsByMachineStateMap;
