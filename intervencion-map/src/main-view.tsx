import { Box, Tab, Tabs } from "grommet";
import { Suspense, lazy } from "react";

const Records = lazy(() => import("./components/records"));
const CreationForm = lazy(() => import("./features/form"));
const MapComponent = lazy(() => import("./features/map"));

const MainView = () => (
  <Tabs>
    <Tab title="Votación">
      <Suspense>
        <Box margin={{ top: "large" }}>
          <CreationForm />
        </Box>
      </Suspense>
    </Tab>
    <Tab title="Flyer"></Tab>
    <Tab title="Mapa">
      <Suspense>
        <Box margin={{ top: "large" }}>
          <MapComponent />
        </Box>
      </Suspense>
    </Tab>
    <Tab title="Registros">
      <Suspense>
        <Box margin={{ top: "large" }}>
          <Records />
        </Box>
      </Suspense>
    </Tab>
  </Tabs>
);

export default MainView;
