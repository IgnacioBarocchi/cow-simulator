import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { preset } from "../constants/colors";

export const formAtom = atomWithStorage("loginForm", {
  email: "",
  password: "",
});

export const errorAtom = atomWithStorage("loginError", "");

export const logged = atomWithStorage("loggedIn", false);

export const meetupFormAtom = atom({
  value: {
    selectedNeighborhood: "FLORES",
    selectedAvenue1: "",
    selectedAvenue2: "",
    selectedTime: "",
    selectedDate: new Date().toISOString(),
  },
  options: {
    neighborhood: preset.map((v) => v.option),
    avenue1: [],
    avenue2: [],
  }
});


export const selectedValuesAtom = atom({
  selectedNeighborhood: "",
  selectedAvenue1: "",
  selectedAvenue2: "",
});
