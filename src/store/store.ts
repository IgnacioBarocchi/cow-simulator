import { atom } from "jotai";

// export const useCowSimulatorStore = create<CowSimulatorState>()(
//   subscribeWithSelector((set) => ({
//     currentScenario: Scenarios.COW_PEN,
//     setCurrentScenario: (scenario: Scenario): void => {
//       // @ts-ignore
//       set({ scenario });
//     },
//     cow3DModelGroup: null,
//     setCow3DModelGroup: (cow3DModelGroup: Group | null): void => {
//       if (cow3DModelGroup) {
//         set({ cow3DModelGroup });
//       }
//     },
//   }))
// );

// // Guarda el estado en localStorage con clave "myData"
// export const myPersistentAtom = atomWithStorage("cashedModel", null);

export const terrainLoadedAtom = atom(false);
export const cowLoadedAtom = atom(false);
