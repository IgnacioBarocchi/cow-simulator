import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Scenario, Scenarios } from "../components/Scenario/@types/Scenario";
import { CowSimulatorState } from "./types/CowSimulatorStore";
import { Group } from "three";

export const useCowSimulatorStore = create<CowSimulatorState>()(
  subscribeWithSelector((set) => ({
    currentScenario: Scenarios.COW_PEN,
    setCurrentScenario: (scenario: Scenario): void => {
      // @ts-ignore
      set({ scenario });
    },
    cow3DModelGroup: null,
    setCow3DModelGroup: (cow3DModelGroup: Group | null): void => {
      if (cow3DModelGroup) {
        set({ cow3DModelGroup });
      }
    },
  }))
);
