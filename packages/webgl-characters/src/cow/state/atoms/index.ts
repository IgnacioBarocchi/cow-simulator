import { atom } from "jotai";
import { atomWithMachine } from "jotai-xstate";
import playerMachine from "../machine/playerMachine";

export const playerMachineAtom = atomWithMachine(playerMachine, { devTools: true });
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

enum Controls {
    FORWARD = "FORWARD",
    BACKWARD = "BACKWARD",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    JUMP = "JUMP",
    SPRINT = "SPRINT",
    ATTACK1 = "ATTACK1",
    ATTACK2 = "ATTACK2",
    EAT = "EAT",
}

export const inputAtom = atom(Object.keys(Controls).reduce((state, key) => {
    // @ts-ignore
    state[key] = false;
    return state;
}, {} as { [key in Controls]: boolean }));
