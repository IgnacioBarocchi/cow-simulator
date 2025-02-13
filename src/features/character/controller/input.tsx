import { KeyboardControls } from "@react-three/drei";

export enum Controls {
  FORWARD = "FORWARD",
  BACKWARD = "BACKWARD",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  JUMP = "JUMP",
  SPRINT = "SPRINT",
  ATTACK1 = "ATTACK1",
  ATTACK2 = "ATTACK2",
  EAT = "EAT",
}

const keyMap = [
  { name: Controls.FORWARD, keys: ["ArraowUp", "KeyW"] },
  { name: Controls.BACKWARD, keys: ["ArraowDown", "KeyS"] },
  { name: Controls.LEFT, keys: ["ArraowLeft", "KeyA"] },
  { name: Controls.RIGHT, keys: ["ArraowRight", "KeyD"] },
  { name: Controls.JUMP, keys: ["Space"] },
  { name: Controls.ATTACK1, keys: ["KeyJ"] },
  { name: Controls.ATTACK2, keys: ["KeyK"] },
  { name: Controls.EAT, keys: ["KeyL"] },
  { name: Controls.SPRINT, keys: ["ShiftLeft", "ShiftRight"] },
];

// Single reference
export const input = Object.keys(Controls).reduce(
  (soFar, key) => ({ ...soFar, [key]: false }),
  {} as Input
);

// Can go anywhere
export function InputControls() {
  return (
    <KeyboardControls
      map={keyMap}
      children={null}
      onChange={(control, engaged) => {
        input[control as Controls] = engaged;
      }}
    />
  );
}

type ControlsState<T extends string = string> = { [K in T]: boolean };
export type Input = ControlsState<Controls>;
