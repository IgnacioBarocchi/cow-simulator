import { Box } from "grommet";
import { Controls } from "../../../../types";
import useControls from "../../../../hooks/useControls";

const ControlButton = ({ bind, gridArea }) => {
  return (
    <Box
      gridArea={gridArea}
      round="full"
      background="rgba(255, 255, 255, 0.3)"
      width="50px"
      height="50px"
      style={{
        pointerEvents: "auto",
        touchAction: "auto",
      }}
      {...bind}
    />
  );
};

const FourControls = ({ up, left, right, down }) => {
  return (
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
      <ControlButton bind={up} gridArea="1 / 2" />
      <ControlButton bind={left} gridArea="2 / 1" />
      <ControlButton bind={right} gridArea="2 / 3" />
      <ControlButton bind={down} gridArea="3 / 2" />
    </Box>
  );
};

const MobileControls = () => {
  const { setMobileControl } = useControls();
  const bindForward = setMobileControl(10000, Controls.FORWARD);
  const bindLeft = setMobileControl(10000, Controls.LEFT);
  const bindRight = setMobileControl(10000, Controls.RIGHT);
  const bindBackward = setMobileControl(10000, Controls.BACKWARD);
  const bindJump = setMobileControl(0, Controls.JUMP);
  const bindAttack1 = setMobileControl(0, Controls.ATTACK1);
  const bindAttack2 = setMobileControl(0, Controls.ATTACK2);
  const bindSprint = setMobileControl(0, Controls.SPRINT);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        // marginBottom: "calc( env(safe-area-inset-bottom) + 20px )",
        marginBottom: "100px",
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      <FourControls
        up={bindForward}
        left={bindLeft}
        right={bindRight}
        down={bindBackward}
      />
      <FourControls
        up={bindJump}
        left={bindSprint}
        right={bindAttack1}
        down={bindAttack2}
      />
    </div>
  );
};

export default MobileControls;
