import { Box, Layer } from "grommet";

import { KeyboardControls } from "@react-three/drei";
import { block } from "million/react";
import { useDevice } from "use-device-react";
import { useLongPress } from "use-long-press";

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

const useControlPress = (control: Controls) =>
  useLongPress(() => setControl(control, true), {
    onFinish: () => setControl(control, false),
    onCancel: () => setControl(control, false),
    threshold: 100,
    captureEvent: true,
    cancelOnMovement: 20,
    // detect: "pointer",
  });

const ControlButton = block(({ bind, position }) => (
  <Box
    round="full"
    background="rgba(255, 255, 255, 0.7)"
    width="50px"
    height="50px"
    style={{ poinerEvents: "auto", position: "absolute", ...position }}
    {...bind()}
  />
));

const MobileControls = block(() => {
  const bindForward = useControlPress(Controls.FORWARD);
  const bindLeft = useControlPress(Controls.LEFT);
  const bindRight = useControlPress(Controls.RIGHT);
  const bindBackward = useControlPress(Controls.BACKWARD);
  const bindAttack1 = useControlPress(Controls.ATTACK1);
  const bindAttack2 = useControlPress(Controls.ATTACK2);

  return (
    <>
      <Layer
        position="bottom-left"
        margin="small"
        modal={false}
        responsive={false}
        background="transparent"
      >
        <Box width="150px" height="150px" style={{ position: "relative" }}>
          <ControlButton
            bind={bindForward}
            position={{ top: 0, left: "50px" }}
          />
          <ControlButton bind={bindLeft} position={{ top: "50px", left: 0 }} />
          <ControlButton
            bind={bindRight}
            position={{ top: "50px", left: "100px" }}
          />
          <ControlButton
            bind={bindBackward}
            position={{ top: "100px", left: "50px" }}
          />
        </Box>
      </Layer>
      <Layer
        position="bottom-right"
        margin="small"
        modal={false}
        responsive={false}
        background="transparent"
      >
        <Box width="100px" height="100px" style={{ position: "relative" }}>
          <ControlButton
            bind={bindAttack1}
            position={{ top: 0, left: "25px" }}
          />
          <ControlButton
            bind={bindAttack2}
            position={{ top: "50px", left: "25px" }}
          />
        </Box>
      </Layer>
    </>
  );
});

export function InputControls() {
  const { isDesktop } = useDevice();
  return isDesktop ? (
    <KeyboardControls map={keyMap} children={null} onChange={setControl} />
  ) : (
    <MobileControls />
  );
}

type ControlsState<T extends string = string> = { [K in T]: boolean };
export type Input = ControlsState<Controls>;
