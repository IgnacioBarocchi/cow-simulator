import { Box, Grommet } from "grommet";

import CowSimulator from "./view/cow-simulator/index.tsx";
import LandingPage from "./view/landing-page/index.tsx";
import { standardTheme } from "./constants/ui-config.ts";
import { useRef } from "react";

const App = () => {
  const simulationRef = useRef(null);

  return (
    <Grommet theme={standardTheme} themeMode="dark" background="transparent">
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
    </Grommet>
  );
};

export default App;
