import { Box, Layer } from "grommet";
import { Controls, setControl } from "./input";

import { block } from "million/react";
import { useLongPress } from "use-long-press";

const useControlPress = (control: Controls) =>
  useLongPress(() => setControl(control, true), {
    onFinish: () => setControl(control, false),
    onCancel: () => setControl(control, false),
    threshold: 100,
    captureEvent: true,
    cancelOnMovement: 20,
  });

const ControlButton = block(({ bind, position }) => (
  <Box
    round="full"
    background="rgba(255, 255, 255, 0.7)"
    width="50px"
    height="50px"
    style={{ poinerEvents: "auto", position: "absolute", ...position }}
    {...bind?.()}
  />
));

const MobileControls = block(() => {
  const bindForward = useControlPress(Controls.FORWARD);
  const bindLeft = useControlPress(Controls.LEFT);
  const bindRight = useControlPress(Controls.RIGHT);
  const bindBackward = useControlPress(Controls.BACKWARD);

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
        <Box width="150px" height="100px" style={{ position: "relative" }}>
          <ControlButton
            // bind={bindAttack1}
            position={{ top: 0, left: "25px" }}
          />
          <ControlButton
            // bind={bindAttack2}
            position={{ top: "50px", left: "25px" }}
          />
        </Box>
      </Layer>
    </>
  );
});

export default MobileControls;
