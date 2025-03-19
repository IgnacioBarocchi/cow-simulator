import { Box, UIProvider } from "@mono/ui";

import { CowSimulator } from "@mono/webgl-app";
import { LandingPage } from "@mono/pages";
import { useRef } from "react";

function App() {
  const simulationRef = useRef(null);

  return (
    <UIProvider>
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
    </UIProvider>
  );
}

export default App;
