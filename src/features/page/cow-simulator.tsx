import { Suspense, lazy } from "react";

import { Box } from "grommet";
import Connecting from "../../features/ui/connecting/index.tsx";

const UI = lazy(() => import("../../features/ui"));
const WebGlApp = lazy(() => import("../../features/web-gl-app"));

const CowSimulator = () => {
  return (
    <Box
      fill
      height="100vh"
      style={{ position: "relative" }}
      background="black"
    >
      <Box fill style={{ position: "absolute", top: 0, left: 0 }}>
        <Suspense fallback={<Connecting party="3D" background="grey" />}>
          <WebGlApp />
        </Suspense>
      </Box>

      <Box
        fill
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <Suspense fallback={<Connecting party="UI" background="grey" />}>
          <UI />
        </Suspense>
      </Box>
    </Box>
  );
};

export default CowSimulator;
