import PlayerMachine from "../machines/PlayerMachine";
import { atom } from "jotai";
import { atomWithMachine } from "jotai-xstate";

export const playerMachineAtom = atomWithMachine(PlayerMachine, { devTools: true });
export const playerContextAtom = atom((get) => {
    return get(playerMachineAtom).context
});
export const playerStateValueAtom = atom((get) => get(playerMachineAtom)?.value);
export const playerSendAtom = atom((get) => get(playerMachineAtom)[1]);
export const terrainLoadedAtom = atom(false);
export const cowLoadedAtom = atom(false);
export const simulatorState = atom({
    terrainWasLoaded: false,
    characterWasLoaded: false,
});


