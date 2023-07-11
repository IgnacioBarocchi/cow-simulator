import { Scenario } from "../../components/Scenario/@types/Scenario";

export type CowSimulatorState = {
  currentScenario: Scenario;
  setCurrentScenario: (scenario: Scenario) => void;
};
