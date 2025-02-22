import { Box, Layer } from "grommet";
import { Controls, setControl } from "./input-controls";

import { useLongPress } from "@custom-react-hooks/use-long-press";

const useControlPress = (threshold, control: Controls) => {
  return useLongPress(() => setControl(control, true), {
    threshold,
    onStart: () => setControl(control, true),
    onFinish: () => setControl(control, false),
    onCancel: () => setControl(control, false),
    // captureEvent: true,
    // cancelOnMovement: 20,
  });
};

const ControlButton = ({ bind, gridArea }) => (
  <Box
    gridArea={gridArea}
    round="full"
    background="rgba(255, 255, 255, 0.3)"
    width="50px"
    height="50px"
    style={{
      pointerEvents: "auto",
      // position: "relative",
      // ...position,
    }}
    onContextMenu={(e) => e.preventDefault()}
    {...bind}
  />
);

const MobileControls = () => {
  const bindForward = useControlPress(10000, Controls.FORWARD);
  const bindLeft = useControlPress(10000, Controls.LEFT);
  const bindRight = useControlPress(10000, Controls.RIGHT);
  const bindBackward = useControlPress(10000, Controls.BACKWARD);
  const bindJump = useControlPress(0, Controls.JUMP);
  const bindAttack1 = useControlPress(0, Controls.ATTACK1);
  const bindAttack2 = useControlPress(0, Controls.ATTACK2);
  const bindSprint = useControlPress(0, Controls.SPRINT);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      <Box
        width="150px"
        height="150px"
        justify="center"
        align="center"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          placeItems: "center",
        }}
      >
        <ControlButton bind={bindForward} gridArea="1 / 2" />
        <ControlButton bind={bindLeft} gridArea="2 / 1" />
        <ControlButton bind={bindRight} gridArea="2 / 3" />
        <ControlButton bind={bindBackward} gridArea="3 / 2" />
      </Box>

      <Box
        width="150px"
        height="150px"
        justify="center"
        align="center"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          placeItems: "center",
        }}
      >
        <ControlButton bind={bindJump} gridArea="1 / 2" />
        <ControlButton bind={bindSprint} gridArea="2 / 1" />
        <ControlButton bind={bindAttack1} gridArea="2 / 3" />
        <ControlButton bind={bindAttack2} gridArea="3 / 2" />
      </Box>
    </div>
  );
};

export default MobileControls;
