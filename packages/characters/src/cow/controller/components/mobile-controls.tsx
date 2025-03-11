import { Controls } from "../../types";
import FourControls from "./four-controls";
import { HTMLAttributes } from "react";
import { publicExperimentalFeatures } from "@mono/context";
import useControls from "../../hooks/useControls";

const containerStyle = {
  position: "absolute",
  bottom: 0,
  marginBottom: publicExperimentalFeatures.useSafeArea
    ? "calc( env(safe-area-inset-bottom) + 20px )"
    : "100px",
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
} as HTMLAttributes<HTMLDivElement>;

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
    <div style={containerStyle}>
      <FourControls
        up={bindForward}
        left={bindLeft}
        right={bindRight}
        down={bindBackward}
      />
      {publicExperimentalFeatures.useExtraControls && (
        <FourControls
          up={bindJump}
          left={bindSprint}
          right={bindAttack1}
          down={bindAttack2}
        />
      )}
    </div>
  );
};

export default MobileControls;
