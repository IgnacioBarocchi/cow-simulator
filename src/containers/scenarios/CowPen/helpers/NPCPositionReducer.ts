import { Dispatch } from "react";
import { Vector3 } from "three";
import { EntitiesNames } from "../../../../lib/object3DHelper";
import { Entity } from "../../../../lib/object3DHelper";

export const cowPenVertices: { [x: string]: Vector3 } = {
  // Limits
  AL: new Vector3(4.5, 0, 1.5),
  BL: new Vector3(2.5, 0, 4.5),
  CL: new Vector3(-2.5, 0, 4.5),
  DL: new Vector3(-4.5, 0, 1.5),
  EL: new Vector3(-4.5, 0, -2.5),
  FL: new Vector3(-2.5, 0, -4.5),
  GL: new Vector3(2.5, 0, -4.5),
  HL: new Vector3(4.5, 0, -2.5),

  // Center
  IC: new Vector3(2.5, 0, 1.5),
  JC: new Vector3(-2.5, 0, 1.5),
  KC: new Vector3(-2.5, 0, -2.5),
  LC: new Vector3(2.5, 0, -2.5),
};

export const connectionsMap = {
  AL: ["IC"],
  BL: ["IC"],
  CL: ["JC"],
  DL: ["JC"],
  EL: ["KC"],
  FL: ["KC"],
  GL: ["LC"],
  HL: ["LC"],

  IC: ["AL", "BL", "JC", "LC"],
  JC: ["DL", "KC", "IC", "CL"],
  KC: ["EL", "FL", "LC", "JC"],
  LC: ["LC", "HL", "IC", "KC"],
};

const Actions = {
  UPDATE_FARMER_POSITION: "UPDATE_FARMER_POSITION",
  UPDATE_FWORKER_POSITION: "UPDATE_FWORKER_POSITION",
  UPDATE_MWORKER_POSITION: "UPDATE_MWORKER_POSITION",
  UPDATE_POSITION: "UPDATE_POSITION",
};

type ActionType = {
  type: string;
  payload: {
    entity: Entity;
    currentPosition: Vector3;
    newPosition: Vector3;
  };
};

export const initialNPCPositionsState: {
  [x: Entity | string]: {
    startingPosition: Vector3;
    currentPosition: Vector3;
    nextPosition: Vector3;
  };
} = {
  [EntitiesNames.FARMER]: {
    // readonly
    startingPosition: cowPenVertices.AL,
    currentPosition: cowPenVertices.AL,
    nextPosition: cowPenVertices.IC,
  },
  [EntitiesNames.FWORKER]: {
    // readonly
    startingPosition: cowPenVertices.GL,
    currentPosition: cowPenVertices.GL,
    nextPosition: cowPenVertices.LC,
  },
  [EntitiesNames.MWORKER]: {
    // readonly
    startingPosition: cowPenVertices.FL,
    currentPosition: cowPenVertices.FL,
    nextPosition: cowPenVertices.KC,
  },
};

export default function NPCPositionReducer(
  state: typeof initialNPCPositionsState,
  action: ActionType
) {
  switch (action.type) {
    case Actions.UPDATE_POSITION: {
      const { entity, currentPosition, newPosition } = action.payload;
      return {
        ...state,
        [entity]: {
          ...state[entity],
          currentPosition,
          nextPosition: newPosition,
        },
      };
    }
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export const updatePosition = (
  entity: Entity,
  currentPosition: Vector3,
  newPosition: Vector3,
  dispatch: Dispatch<ActionType>
) => {
  dispatch({
    type: Actions.UPDATE_POSITION,
    payload: { entity, currentPosition, newPosition },
  });
};
