import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const formAtom = atomWithStorage("loginForm", {
  email: "",
  password: "",
});

export const errorAtom = atomWithStorage("loginError", "");

export const logged = atomWithStorage("loggedIn", false);

export const meetupFormAtom = atom({
  place: "FLORES",
  address: [],
  time: "",
  date: new Date().toISOString(),
});
