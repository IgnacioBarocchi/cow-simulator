import { Box } from "@mono/ui";
import { ControlledEvents } from "../../hooks/useControls";
import { FC } from "react";

const ControlButton: FC<{ bind: ControlledEvents; gridArea: string }> = ({
  bind,
  gridArea,
}) => {
  return (
    <Box
      gridArea={gridArea}
      round="full"
      background="rgba(255, 255, 255, 0.3)"
      width="40px"
      height="40px"
      style={{
        pointerEvents: "auto",
        touchAction: "auto",
      }}
      {...bind}
    />
  );
};

const FourControls: FC<{
  up: ControlledEvents;
  left: ControlledEvents;
  right: ControlledEvents;
  down: ControlledEvents;
}> = ({ up, left, right, down }) => {
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

export default FourControls;
