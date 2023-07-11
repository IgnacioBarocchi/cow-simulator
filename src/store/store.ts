import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Scenario, Scenarios } from "../scenarios/@types/Scenario";
import { CowSimulatorState } from "./types/CowSimulatorStore";

export const useSktioStore = create<CowSimulatorState>()(
  subscribeWithSelector((set) => ({
    currentScenario: Scenarios.COW_PEN,
    setCurrentScenario: (scenario: Scenario): void => {
      // @ts-ignore
      set({ scenario });
    },
  }))
);
