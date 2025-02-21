import { Box } from "grommet";
import CowSimulator from "./features/page/cow-simulator.tsx";
import LandingPage from "./features/page/landing-page.tsx";
import { useRef } from "react";

const App = () => {
  const simulationRef = useRef(null);

  return (
    <Box>
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
    </Box>
  );
};

export default App;
