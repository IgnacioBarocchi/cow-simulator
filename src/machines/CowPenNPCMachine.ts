import { createMachine } from "xstate";

export const NPCstateEvents = {
  IDLE: "idle",
  RUN: "RUN",
  WALK: "WALK",
  PUNCH: "PUNCH",
  KICK: "KICK",
  INTERACT: "INTERACT",
} as const;

// todo: conver to map
export const NPCStates = {
  idle: "idle",
  walk: "walk",
  run: "run",
  punch: "punch",
  kick: "kick",
} as const;

export type NPCMachineStateValue = keyof typeof NPCStates;

const cowPenNPCMachine = createMachine({
  id: "myStateMachine",
  initial: "idle",
  predictableActionArguments: true,
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
