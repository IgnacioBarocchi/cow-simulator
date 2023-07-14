import {
  CylinderCollider,
  IntersectionEnterHandler,
  IntersectionEnterPayload,
  RigidBody,
} from "@react-three/rapier";
import NPCPositionReducer, {
  connectionsMap,
  cowPenVertices,
  initialNPCPositionsState,
  updatePosition,
} from "./helpers/NPCPositionReducer";
import { useContext, useReducer } from "react";

import { AppContext } from "../../context/AppContext";
import { EntityNames } from "../../../lib/object3DHelper";
import FWorker from "../../../components/Entities/FWorker/FWorker";
import Farmer from "../../../components/Entities/Farmer/Farmer";
import MWorker from "../../../components/Entities/MWorker/MWorker";
import { Text } from "@react-three/drei";

const CowPenControlledNPC = () => {
  const { DEBUG_PHYSICS } = useContext(AppContext);

  const [state, dispatch] = useReducer(
    NPCPositionReducer,
    initialNPCPositionsState
  );

  const intersectionEnterHandler = ((payload: IntersectionEnterPayload) => {
    const currentVertextName = payload?.target?.colliderObject
      ?.name as keyof typeof connectionsMap;

    const entityName = String(
      payload.other.rigidBodyObject?.name
    ) as keyof typeof EntityNames;

    if (!currentVertextName || !entityName) return;

    const { FARMER, FWORKER, MWORKER, COW } = EntityNames;
    const NPCInsideVertex = [FARMER, FWORKER, MWORKER, COW].includes(
      entityName
    );

    if (NPCInsideVertex) {
      if (COW === entityName) {
        throw new Error(`Player outside boundings`);
      }

      const nextVertexName: string =
        connectionsMap[currentVertextName][
          Math.floor(Math.random() * connectionsMap[currentVertextName].length)
        ];

      const currentVertexPosition = cowPenVertices[currentVertextName];
      const nextVertexPosition = cowPenVertices[nextVertexName];

      setTimeout(() => {
        updatePosition(
          entityName,
          currentVertexPosition,
          nextVertexPosition,
          dispatch
        );
      }, 500);
    }
  }) as IntersectionEnterHandler;

  return (
    <group>
      <Farmer
        initialVertext={state[EntityNames.FARMER].startingPosition}
        nextVertexPosition={state[EntityNames.FARMER].nextPosition}
        currentVertexPosition={state[EntityNames.FARMER].currentPosition}
      />
      <FWorker
        initialVertext={state[EntityNames.FWORKER].startingPosition}
        nextVertexPosition={state[EntityNames.FWORKER].nextPosition}
        currentVertexPosition={state[EntityNames.FWORKER].currentPosition}
      />
      <MWorker
        initialVertext={state[EntityNames.MWORKER].startingPosition}
        nextVertexPosition={state[EntityNames.MWORKER].nextPosition}
        currentVertexPosition={state[EntityNames.MWORKER].currentPosition}
      />
      <RigidBody type={"fixed"}>
        {Object.entries(cowPenVertices).map(([nodeName, vector3], i) => {
          const x = vector3.x;
          const z = vector3.z;
          return (
            <>
              {DEBUG_PHYSICS && (
                <Text
                  key={`txt-${i}-${nodeName}`}
                  scale={[0.5, 0.5, 0.5]}
                  position={[x, 1, z]}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  {nodeName}
                </Text>
              )}
              <CylinderCollider
                sensor={true}
                args={[0.1, 0.5]}
                key={`vtx-${i}-${nodeName}`}
                name={nodeName}
                position={[x, 0.5, z]}
                onIntersectionEnter={intersectionEnterHandler}
              />
            </>
          );
        })}
      </RigidBody>
    </group>
  );
};

export default CowPenControlledNPC;
