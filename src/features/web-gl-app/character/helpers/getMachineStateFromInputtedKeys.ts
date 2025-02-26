import { Keys } from "../../../lib/keysMap";
// import { stateEvents } from "../../../../machines/PlayerMachine";
const stateEvents = {
  IDLE: "idle",
  ATTACK_HEADBUTT: "ATTACK_HEADBUTT",
  ATTACK_KICK: "ATTACK_KICK",
  EATING: "EATING",
  GALLOP: "GALLOP",
  IDLE_HITREACT: "IDLE_HITREACT",
  WALK: "WALK",
  DEATH: "DEATH",
  GALLOP_JUMP: "GALLOP_JUMP",
} as const;
const { WALK, GALLOP_JUMP, EATING, ATTACK_KICK, ATTACK_HEADBUTT, IDLE } =
  stateEvents;

export default function getMachineStateFromInputtedKeys(keys: Keys) {
  const {
    forward,
    backward,
    leftward,
    rightward,
    gallopJump,
    attackHeadbutt,
    attackKick,
    eating,
  } = keys;

  if (forward || backward || leftward || rightward) {
    return { type: WALK };
  }

  if (gallopJump) {
    return { type: GALLOP_JUMP };
  }

  if (eating) {
    return { type: EATING };
  }

  if (attackKick) {
    return { type: ATTACK_KICK };
  }

  if (attackHeadbutt) {
    return { type: ATTACK_HEADBUTT };
  }

  return { type: IDLE };
}
