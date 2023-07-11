import { Scenario } from "../../containers/scenarios/@types/Scenario";

export type CowSimulatorState = {
  currentScenario: Scenario;
  setCurrentScenario: (scenario: Scenario) => void;
};
