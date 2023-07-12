import { createMachine } from "xstate";

const cowPenNPCMachine = createMachine({
  id: "myStateMachine",
  initial: "idle",
  states: {
    idle: {
      on: {
        WALK: "walk",
        RUN: "run",
        PUNCH: "punch",
        KICK: "kick",
        INTERACT: "interact",
      },
    },
    walk: {
      on: {
        idle: "idle",
        RUN: "run",
        PUNCH: "punch",
        KICK: "kick",
        INTERACT: "interact",
      },
    },
    run: {
      after: {
        4000: "walk",
      },
    },
    punch: {
      after: {
        1000: "idle",
      },
    },
    kick: {
      after: {
        1000: "idle",
      },
    },
    interact: {
      after: {
        1000: "idle",
      },
    },
  },
});

export default cowPenNPCMachine;
