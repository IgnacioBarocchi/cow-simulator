import { useContext, useReducer, useState } from "react";
import { PositionalAudio, Text } from "@react-three/drei";
import {
  CollisionEnterHandler,
  CuboidCollider,
  CylinderCollider,
  IntersectionEnterHandler,
  IntersectionEnterPayload,
  RigidBody,
} from "@react-three/rapier";
import { AppContext } from "../../context/AppContext";
import { EntitiesNames, Hitboxes } from "../../../lib/object3DHelper";
import Farmer from "../../../components/Entities/Farmer/Farmer";
import NPCPositionReducer, {
  connectionsMap,
  cowPenVertices,
  initialNPCPositionsState,
  updatePosition,
} from "./helpers/NPCPositionReducer";

const CowPenMapVertices = () => {
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
    ) as keyof typeof EntitiesNames;

    if (!currentVertextName || !entityName) return;

    const { FARMER, FWORKER, MWORKER, COW } = EntitiesNames;
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

      if (entityName === EntitiesNames.FARMER) {
        const currentVertexPosition = cowPenVertices[currentVertextName];
        const nextVertexPosition = cowPenVertices[nextVertexName];

        console.table({ entityName, currentVertextName, nextVertexName });

        updatePosition(
          EntitiesNames.FARMER,
          currentVertexPosition,
          nextVertexPosition,
          dispatch
        );
      }
    }
  }) as IntersectionEnterHandler;

  return (
    <group>
      <Farmer
        initialVertext={state[EntitiesNames.FARMER].startingPosition}
        nextVertexPosition={state[EntitiesNames.FARMER].nextPosition}
        currentVertexPosition={state[EntitiesNames.FARMER].currentPosition}
      />
      <RigidBody type={"fixed"}>
        {Object.entries(cowPenVertices).map(([nodeName, vec], i) => {
          const x = vec.x;
          const z = vec.z;
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

export default CowPenMapVertices;
