import { atom } from "jotai";

export const terrainLoadedAtom = atom(false);
export const cowLoadedAtom = atom(false);
export const simulatorState = atom({
    terrainWasLoaded: false,
    characterWasLoaded: false,
});


