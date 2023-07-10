import { Scenario } from "../../scenarios/@types/Scenario";

export type CowSimulatorState = {
  currentScenario: Scenario;
  setCurrentScenario: (scenario: Scenario) => void;
};
