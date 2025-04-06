import { Tabs, Tab } from "grommet";
import RandomWheel from "./components/random-wheel";
import Records from "./components/records";
import MapComponent from "./components/map";
import { CreationForm } from "./components/creation-form";

export const MainView = () => (
  <Tabs>
    <Tab title="Votación">
      <CreationForm />
    </Tab>
    <Tab title="Flyer"></Tab>
    <Tab title="Mapa">
      <MapComponent />
    </Tab>
    <Tab title="Registros">
      <Records />
    </Tab>
  </Tabs>
);
