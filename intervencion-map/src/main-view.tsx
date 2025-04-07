import { Suspense, lazy } from "react";
import { Tab, Tabs } from "grommet";

const Records = lazy(() => import("./components/records"));
const CreationForm = lazy(() => import("./features/form"));
const MapComponent = lazy(() => import("./features/map"));

const MainView = () => (
  <Tabs>
    <Tab title="Votación">
      <Suspense>
        <CreationForm />
      </Suspense>
    </Tab>
    <Tab title="Flyer"></Tab>
    <Tab title="Mapa">
      <Suspense>
        <MapComponent />
      </Suspense>
    </Tab>
    <Tab title="Registros">
      <Suspense>
        <Records />
      </Suspense>
    </Tab>
  </Tabs>
);

export default MainView;
