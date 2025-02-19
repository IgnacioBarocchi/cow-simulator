import { Suspense, lazy } from "react";

import Connecting from "../../ui/connecting";
import { KeyboardControls } from "@react-three/drei";
import { useDevice } from "use-device-react";

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

type ControlsState<T extends string = string> = { [K in T]: boolean };
export type Input = ControlsState<Controls>;

const keyMap = [
  { name: Controls.FORWARD, keys: ["KeyW"] },
  { name: Controls.BACKWARD, keys: ["KeyS"] },
  { name: Controls.LEFT, keys: ["KeyA"] },
  { name: Controls.RIGHT, keys: ["KeyD"] },
  { name: Controls.JUMP, keys: ["Space"] },
  { name: Controls.ATTACK1, keys: ["KeyJ"] },
  { name: Controls.ATTACK2, keys: ["KeyK"] },
  { name: Controls.EAT, keys: ["KeyL"] },
  { name: Controls.SPRINT, keys: ["ShiftLeft", "ShiftRight"] },
];

export const input = Object.keys(Controls).reduce(
  (state, key) => ({ ...state, [key]: false }),
  {} as Input
);

export const setControl = (control: Controls, engaged: boolean) => {
  input[control] = engaged;
};

const MobileControls = lazy(() => import("./mobile-controls"));

export function InputControls() {
  const { isDesktop } = useDevice();

  if (isDesktop) {
    return (
      <KeyboardControls map={keyMap} children={null} onChange={setControl} />
    );
  }

  return (
    <Suspense fallback={<Connecting party="Controles" color="orange" />}>
      <MobileControls />
    </Suspense>
  );
}
