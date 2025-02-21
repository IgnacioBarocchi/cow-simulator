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

const ControlButton = ({ bind, position }) => (
  <Box
    round="full"
    background="rgba(255, 255, 255, 0.3)"
    width="50px"
    height="50px"
    style={{
      pointerEvents: "auto",
      position: "absolute", // Absolute positioning inside the control layout
      ...position,
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
        <Box width="150px" height="150px" style={{ position: "relative" }}>
          <ControlButton bind={bindJump} position={{ top: 0, left: "50px" }} />
          <ControlButton
            bind={bindSprint}
            position={{ top: "50px", left: 0 }}
          />
          <ControlButton
            bind={bindAttack1}
            position={{ top: "50px", left: "100px" }}
          />
          <ControlButton
            bind={bindAttack2}
            position={{ top: "100px", left: "50px" }}
          />
        </Box>
      </Layer>
    </>
  );
};

export default MobileControls;

// import { Box, Layer } from "grommet";
// import { Controls, setControl } from "./input-controls";

// // import { block } from "million/react";
// import { useLongPress } from "use-long-press";

// const useControlPress = (control: Controls) =>
//   useLongPress(
//     (event) => {
//       console.log("long press");
//       event.preventDefault();
//       event.stopPropagation();
//       setControl(control, true);
//     },
//     {
//       onFinish: (event) => {
//         event.preventDefault();
//         event.stopPropagation();
//         setControl(control, false);
//       },
//       onCancel: (event) => {
//         event.preventDefault();
//         event.stopPropagation();
//         setControl(control, false);
//       },
//       threshold: 100,
//       captureEvent: true,
//       cancelOnMovement: 20,
//     }
//   );

// const ControlButton = ({ bind, position }) => (
//   <Box
//     round="full"
//     background="rgba(255, 255, 255, 0.3)"
//     width="50px"
//     height="50px"
//     style={{ pointerEvents: "auto", position: /*"absolute"*/"relative", ...position }}
//     onContextMenu={(e) => e.preventDefault()}
//     {...bind?.()}
//   />
// );

// const MobileControls = () => {
//   const bindForward = useControlPress(Controls.FORWARD);
//   const bindLeft = useControlPress(Controls.LEFT);
//   const bindRight = useControlPress(Controls.RIGHT);
//   const bindBackward = useControlPress(Controls.BACKWARD);
//   const bindJump = useControlPress(Controls.JUMP);
//   const bindAttack1 = useControlPress(Controls.ATTACK1);
//   const bindAttack2 = useControlPress(Controls.ATTACK2);
//   const bindSprint = useControlPress(Controls.SPRINT);

//   return (
//     <>
//       <Layer
//         position="bottom-left"
//         margin="small"
//         modal={false}
//         responsive={false}
//         background="transparent"
//       >
//         <Box width="150px" height="150px" style={{ position: "relative" }}>
//           <ControlButton
//             bind={bindForward}
//             position={{ top: 0, left: "50px" }}
//           />
//           <ControlButton bind={bindLeft} position={{ top: "50px", left: 0 }} />
//           <ControlButton
//             bind={bindRight}
//             position={{ top: "50px", left: "100px" }}
//           />
//           <ControlButton
//             bind={bindBackward}
//             position={{ top: "100px", left: "50px" }}
//           />
//         </Box>
//       </Layer>
//       <Layer
//         position="bottom-right"
//         margin="small"
//         modal={false}
//         responsive={false}
//         background="transparent"
//       >
//         <Box width="150px" height="150px" style={{ position: "relative" }}>
//           <ControlButton bind={bindJump} position={{ top: 0, left: "50px" }} />
//           <ControlButton
//             bind={bindSprint}
//             position={{ top: "50px", left: 0 }}
//           />
//           <ControlButton
//             bind={bindAttack1}
//             position={{ top: "50px", left: "100px" }}
//           />
//           <ControlButton
//             bind={bindAttack2}
//             position={{ top: "100px", left: "50px" }}
//           />
//         </Box>
//       </Layer>
//     </>
//   );
// };

// export default MobileControls;
