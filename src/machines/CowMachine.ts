import { createMachine } from "xstate";

// todo: conver to map
export const stateEvents = {
  IDLE: "idle",
  ATTACK_HEADBUTT: "ATTACK_HEADBUTT",
  ATTACK_KICK: "ATTACK_KICK",
  EATING: "EATING",
  GALLOP: "GALLOP",
  IDLE_HITREACT: "IDLE_HITREACT",
  WALK: "WALK",
  DEATH: "DEATH",
  GALLOP_JUMP: "GALLOP_JUMP",
} as const;

// todo: conver to map
export const States = {
  idle: "idle",
  attackHeadbutt: "attackHeadbutt",
  attackKick: "attackKick",
  eating: "eating",
  gallop: "gallop",
  idleHitReact: "idleHitReact",
  walk: "walk",
  death: "death",
  gallopJump: "gallopJump",
} as const;

export type MachineStateValue = keyof typeof States;

const CowMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5RQIYFswGEAWKBOKAxgC5h4B0AlhADZgDEAggCrOOYDSA+gBICijACIAhAKqsA2gAYAuolAAHAPaxKxSkoB28kAA9EAJikBmcgE4A7GYCMANgCsB+8ftSALAA4ANCACeiazdbC3InN083ezcLe1szYwBfBJ9UDBx8IlIKajomVnZuDgBJTmk5JBBlVXUtHX0EI1NLGwcnF3dvP0RbD3tya2MPEzdjI3trJJT0LFwCEjIqWgYBZiKAOQBxMp0qtQ1tCvrG8ys7R2dXTx9-BqkDUOspMzcpOONjYcTkkFSZjPnskt6BtGAAZUEAeQACtsKrsagdQEcTCcWud2lcuggzB43ORRhZjGYno1bAZbJMftN0nMsotckVBKC+LwiswAEoCTDMWGKFR7WqHQwo5pnNqXTo3cKmYLhDwxV7E2y2NyU340zILHIMADqYI4vMq-IRdWFTVOrQuHWuiF6pnsOMeBhcUXsFgsaups01gNyghWPEN8P2ptu5rR4utWOsBic5CsT2M7veZgcHk9aW9APIqBoNCUCmBYMhUK4AClRABZGGyHbGkNC7Ex-HWDyWUYGQmdgw27Hu8hSU4fD6p4lfKaZ-503P5hRlgCuaELFerXGYEMZzKD9cFSMQZiMA4PRN6bms54svY81nI0RaFgMHgcUmsHu+6qzdIA7igaABrPI2E4XgBBEcQeVrOEd0RPREGcWx4wdJ5bGMWwTHcHto2MIJyEcTtz0CQdggpd8vSnBYf3-QCCi4YpSkgvlqgbPcEHgxDiVTVD0LcTCbmvUwBiMCxFTMMw3RIic-lpCjfwAlZ1i2BijSY3dYNY1D2OQriPh43sO3MHiLECR4XykcZ7AzKSfXISiAJBcFoW3FSYPqNiYg4lC0J03jbRQ3CxNsV9xhcNCzEsjVs1s+hNxZHg2U5dgIPKRiBRcuCNPcrSvIw3tYjxF4yVCgZhI8ccqUnaSKCivVQQNJTg1U+ozzxTzhOMVs7h6IIrzM8gnxxQcH0Jc8JPKqzItk+h-RYQN6ug0M3KQzjst06NHj6MyWhGfCVQmSlNCUCA4B0D9yLwOtnNDABaWxexugcpEep7nsegw9skiK6W1C7UtDVabkCRwHndWIbFTCxInCz8FhQYhiCIP8eDAFAIAAI3nOGfpNRsIbMcwPA8AxPCcEx3mMXtAjQ294je+xxjsQmobO8hYfhwg-w4Sh2ax5i1Nx-HCeJ1wyfJrEhgQpMpCGOwVUHEwmcq8hkfUTQoB5xrEH5nFBcJ4Wyb0ux+mvcJXBVN73TfD7oYoGcC3VtKEAsOJ42sGxzMsKJnl7SwQliQK3oJ8IYlVUiKus2250XBR7dDR55T6x7CTE1sUNTb2jPxyJO2edw4ktsbPq1JYeDUdlkZIGOcbcPHtaJ3XSfeXK3XIFVq5seULEJp4Fes2zK5Ys8QiMUrX0CFwUyvQL8TJ10Xhsaue+zI7Yewfu+ergW65JkWKfN-EjLQ4ycUidMkgSIA */
  predictableActionArguments: true,
  id: "gameCharacter",
  initial: "idle",
  states: {
    idle: {
      on: {
        ATTACK_HEADBUTT: "attackHeadbutt",
        ATTACK_KICK: "attackKick",
        EATING: "eating",
        GALLOP: "gallop",
        IDLE_HITREACT: "idleHitReact",
        WALK: "walk",
        DEATH: "death",
      },
    },
    attackHeadbutt: {
      after: {
        [1 * 1000]: "idle",
      },
    },
    attackKick: {
      after: {
        [1 * 1000]: "idle",
      },
    },
    eating: {
      after: {
        [2 * 1000]: "idle",
      },
    },
    gallop: {
      on: {
        GALLOP_JUMP: "gallopJump",
      },
    },
    gallopJump: {
      on: {
        JUMP_TOIDLE: "idle",
      },
    },
    idleHitReact: {
      after: {
        [1 * 1000]: "idle",
      },
    },
    walk: {
      on: {
        idle: "idle",
        ATTACK_HEADBUTT: "attackHeadbutt",
        ATTACK_KICK: "attackKick",
        EATING: "eating",
        GALLOP: "gallop",
        IDLE_HITREACT: "idleHitReact",
        WALK: "walk",
        DEATH: "death",
      },
    },
    death: {
      type: "final",
    },
  },
});

export default CowMachine;
