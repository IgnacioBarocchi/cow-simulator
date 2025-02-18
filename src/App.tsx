import { Suspense, lazy } from "react";

import Connecting from "./features/ui/connecting/index.tsx";

const UI = lazy(() => import("./features/ui"));
const WebGlApp = lazy(() => import("./features/web-gl-app"));

const App = () => {
  return (
    <>
      <Suspense fallback={<Connecting party="3D" background="yellow" />}>
        <WebGlApp />
      </Suspense>
      <Suspense fallback={<Connecting party="UI" background="green" />}>
        <UI />
      </Suspense>
    </>
  );
};

export default App;
