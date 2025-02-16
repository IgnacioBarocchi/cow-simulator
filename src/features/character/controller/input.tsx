import { KeyboardControls } from "@react-three/drei";
import { useDevice } from "use-device-react";
import { useLongPress } from "use-long-press";

const buttonStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  userSelect: "none",
  cursor: "pointer",
  position: "absolute",
  touchAction: "none",
};

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
  (soFar, key) => ({ ...soFar, [key]: false }),
  {} as Input
);

export const setControl = (control, engaged) => {
  input[control as Controls] = engaged;
};

const useControlPress = (control) => {
  return useLongPress(() => setControl(control, true), {
    onFinish: () => setControl(control, false),
    onCancel: () => setControl(control, false),
    threshold: 100, // Adjust threshold for responsiveness
    captureEvent: true,
    cancelOnMovement: 20,
    detect: "pointer",
  });
};

const MobileControls = () => {
  const bindForward = useControlPress(Controls.FORWARD);
  const bindLeft = useControlPress(Controls.LEFT);
  const bindRight = useControlPress(Controls.RIGHT);
  const bindBackward = useControlPress(Controls.BACKWARD);

  return (
    <div style={{ position: "absolute" }}>
      <div style={{ position: "relative", width: "150px", height: "150px" }}>
        {/* Forward (W) */}
        <div
          style={{ ...buttonStyle, top: "0", left: "50px" }}
          {...bindForward()}
        >
          W
        </div>

        {/* Left (A) */}
        <div style={{ ...buttonStyle, top: "50px", left: "0" }} {...bindLeft()}>
          A
        </div>

        {/* Right (D) */}
        <div
          style={{ ...buttonStyle, top: "50px", left: "100px" }}
          {...bindRight()}
        >
          D
        </div>

        {/* Backward (S) */}
        <div
          style={{ ...buttonStyle, top: "100px", left: "50px" }}
          {...bindBackward()}
        >
          S
        </div>
      </div>
    </div>
  );
};

// Can go anywhere
export function InputControls() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { isDesktop } = useDevice();

  return (
    <>
      {isDesktop ? (
        <KeyboardControls map={keyMap} children={null} onChange={setControl} />
      ) : (
        <MobileControls />
      )}
    </>
  );
}

type ControlsState<T extends string = string> = { [K in T]: boolean };
export type Input = ControlsState<Controls>;
