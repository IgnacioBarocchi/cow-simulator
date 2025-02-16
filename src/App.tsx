import { lazy, Suspense } from "react";
import Connecting from "./features/ui/connecting/index.tsx";

const Experience = lazy(() => import("./features/experience/index.tsx"));
const UIProvider = lazy(() => import("./context/ui-provider.tsx"));
const SceneProvider = lazy(() => import("./context/scene-provider.tsx"));

const App = () => {
  return (
    <Suspense fallback={<Connecting />}>
      <UIProvider>
        <SceneProvider>
          <Experience />
        </SceneProvider>
      </UIProvider>
    </Suspense>
  );
};

export default App;
