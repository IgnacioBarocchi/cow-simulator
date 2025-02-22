import { Box, Grommet } from "grommet";

import CowSimulator from "./features/page/cow-simulator.tsx";
import LandingPage from "./features/page/landing-page/";
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet/themes";
import { useRef } from "react";

const customTheme = deepMerge(grommet, {
  global: {
    colors: {
      // brand: "white", // Your brand color
      // "accent-1": "grey",
      // "accent-2": "#FD6FFF",
      // "accent-3": "#81FCED",
      // "neutral-1": "#FFCA58",
      // // Add more custom colors as needed
    },
    font: {
      family: "Ranade-Medium",
      size: "14px",
      height: "20px",
    },
  },
  // Customize component-specific styles
  // button: {
  //   border: {
  //     radius: "5px",
  //   },
  //   primary: {
  //     color: "accent-1",
  //   },
  // },
  // Add more component customizations here
});

const App = () => {
  const simulationRef = useRef(null);

  return (
    // <Grommet theme={customTheme}>
    <>
      <Box height="100vh" id="landing-container">
        <LandingPage
          scrollToSimulation={() => {
            simulationRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </Box>
      <Box ref={simulationRef} height="100vh">
        <CowSimulator />
      </Box>
    </>
    // </Grommet>
  );
};

export default App;
