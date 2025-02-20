import { Suspense, lazy } from "react";

import Connecting from "./features/ui/connecting/index.tsx";

const UI = lazy(() => import("./features/ui"));
const WebGlApp = lazy(() => import("./features/web-gl-app"));

const App = () => {
  return (
    <>
      <Suspense fallback={<Connecting party="3D" background="grey" />}>
        <WebGlApp />
      </Suspense>
      <Suspense fallback={<Connecting party="UI" background="grey" />}>
        <UI />
      </Suspense>
    </>
  );
};

export default App;
