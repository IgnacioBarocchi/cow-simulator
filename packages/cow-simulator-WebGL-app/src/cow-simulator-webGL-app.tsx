import { Suspense, lazy } from "react";

import { Box } from "@mono/ui";
import Connecting from "./features/web-gl-app/ui/connecting/index.js";

const UI = lazy(() => import("./features/web-gl-app/ui/index.tsx"));
const WebGlApp = lazy(() => import("./features/web-gl-app/index.js"));

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
