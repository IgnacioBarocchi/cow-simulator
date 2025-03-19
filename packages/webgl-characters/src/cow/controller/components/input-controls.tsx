import { Suspense, lazy } from "react";

import { Controls } from "../../types";
import { KeyboardControls } from "@react-three/drei";
import { Spinner } from "@mono/ui";
import useControls from "../../hooks/useControls";
import { useDevice } from "use-device-react";

const MobileControls = lazy(() => import("./mobile-controls"));

const keyBinding = [
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

export function InputControls() {
  const { isDesktop } = useDevice();
  const { setControl } = useControls();

  if (isDesktop) {
    return (
      <KeyboardControls
        // @ts-ignore
        onChange={setControl}
        children={null}
        map={keyBinding}
      />
    );
  }
  return (
    <Suspense fallback={<Spinner />}>
      <MobileControls />
    </Suspense>
  );
}
