import { Keys } from "../../../../lib/keysMap";
import { stateEvents } from "../../../../machines/CowMachine";

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
    return WALK;
  }

  if (gallopJump) {
    return GALLOP_JUMP;
  }

  if (eating) {
    return EATING;
  }

  if (attackKick) {
    return ATTACK_KICK;
  }

  if (attackHeadbutt) {
    return ATTACK_HEADBUTT;
  }

  return IDLE;
}
