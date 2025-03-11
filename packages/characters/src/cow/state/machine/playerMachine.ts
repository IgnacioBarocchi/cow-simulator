// todo check archange against the demons repo.
// todo> i think that handles the animations within the machine.
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { assign, createMachine } from "xstate";

import { RelativeSpringSimulator } from "../../lib/physics/RelativeSpringSimulator";
import { Vector3 } from "three";
import { VectorSpringSimulator } from "../../lib/physics/VectorSpringSimulator";
import animationsByMachineStateMap from "../../helpers/animationByMachineStateMap";
import { playOneShotAnimation } from "../../lib/animationHelper";

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



const animate = (self, context) => {
  const currentState = self.getSnapshot().value;
  const animations = animationsByMachineStateMap?.get(currentState);
  if (!animations) {
    return;
  }

  const animationIsOneShot = !["idle", "walk", "gallop"].includes(currentState);

  if (animationIsOneShot) {
    const animation = animations[Math.floor(Math.random() * animations.length)];
    playOneShotAnimation(context?.actions[animation]);
  }
};

const update = ({ context, event, self }) => {

  if (context?.controller) {
    context.controller.update(event.timeStep, event.input);
  }

  if (Object.values(event.input).every((e) => !e)) {
    self.send({ type: "idle" });
  }

  const {
    ATTACK1,
    ATTACK2,
    BACKWARD,
    EAT,
    FORWARD,
    JUMP,
    LEFT,
    RIGHT,
    SPRINT,
  } = event.input;

  if (ATTACK2) {
    self.send({ type: "ATTACK_KICK" });
  }

  if (ATTACK1) {
    self.send({ type: "ATTACK_HEADBUTT" });
  }

  const walk = [BACKWARD, FORWARD, LEFT, RIGHT].some((e) => e);
  if (walk && SPRINT) {
    self.send({ type: "GALLOP" });
  }
  if (walk) {
    self.send({ type: "WALK" });
  }


};

// console.log("name" + "update")

const movementInfo = {
  position: new Vector3(),
  velocity: new Vector3(),
  moveSpeed: 4,
  angularVelocity: 0,
  viewVector: new Vector3(),
  lookVector: new Vector3(),
  orientation: new Vector3(0, 0, 1),
  orientationTarget: new Vector3(0, 0, 1),
  arcadeVelocityTarget: new Vector3(),
  localMovementDirection: new Vector3(),
  velocitySimulator: new VectorSpringSimulator(60, 250, 12),
  rotationSimulator: new RelativeSpringSimulator(60, 250, 12),
};

const stopAnimations = () => {
  // alert("x");
};
const playerMachine = createMachine(
  {
    id: "gameCharacter",
    context: {
      rapierRigidBodyRef: null,
      mesh3DRef: null,
      actions: null,
      controller: null,
      ...{ movementInfo },
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          SET_CONTEXT: {
            actions: assign(({ event }) => {
              return {
                rapierRigidBodyRef: event.refs?.rapierRigidBodyRef,
                mesh3DRef: event.refs?.mesh3DRef,
                actions: event.actions,
                controller: event.controller,
              };
            }),
          },
          ATTACK_HEADBUTT: "attackHeadbutt",
          ATTACK_KICK: "attackKick",
          EATING: "eating",
          GALLOP: "gallop",
          IDLE_HITREACT: "idleHitReact",
          WALK: "walk",
          DEATH: "death",
          UPDATE: {
            actions: "update",
          },
        },
      },
      attackHeadbutt: {
        entry: [stopAnimations.name],
        on: {
          UPDATE: {
            actions: "update",
          },
        },
        after: {
          [1 * 1000]: "idle",
        },
      },
      attackKick: {
        on: {
          UPDATE: {
            actions: "update",
          },
        },
        after: {
          [1 * 1000]: "idle",
        },
      },
      eating: {
        on: {
          UPDATE: {
            actions: "update",
          },
        },
        after: {
          [2 * 1000]: "idle",
        },
      },
      gallop: {
        on: {
          GALLOP_JUMP: "gallopJump",
          UPDATE: {
            actions: "update",
          },
        },
      },
      gallopJump: {
        on: {
          JUMP_TOIDLE: "idle",
          UPDATE: {
            actions: "update",
          },
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
          UPDATE: {
            actions: "update",
          },
        },
      },
      death: {
        type: "final",
        UPDATE: {
          actions: "update",
        },
      },
    },
  },
  {
    actions: {
      update,
      stopAnimations,
    },
  }
);

export default playerMachine;
