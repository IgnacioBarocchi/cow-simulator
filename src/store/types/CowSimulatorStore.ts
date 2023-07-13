import { Group } from "three";
import { Scenario } from "../../components/Scenario/@types/Scenario";

export type CowSimulatorState = {
  currentScenario: Scenario;
  setCurrentScenario: (scenario: Scenario) => void;
  cow3DModelGroup: Group | null;
  setCow3DModelGroup: (cow3DModelGroup: Group) => void;
};
