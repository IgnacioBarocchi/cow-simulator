import { useContext } from "react";
import { Text } from "@react-three/drei";
import {
  CylinderCollider,
  IntersectionEnterHandler,
  IntersectionEnterPayload,
  RigidBody,
} from "@react-three/rapier";
import { AppContext } from "../../context/AppContext";
import { EntitiesNames, Entity } from "../../../lib/object3DHelper";

export const cowPenVertices: { [x: string]: [number, number] } = {
  // Limits
  AL: [4.5, 1.5],
  BL: [2.5, 4.5],
  CL: [-2.5, 4.5],
  DL: [-4.5, 1.5],
  EL: [-4.5, -2.5],
  FL: [-2.5, -4.5],
  GL: [2.5, -4.5],
  HL: [4.5, -2.5],

  // Center
  IC: [2.5, 1.5],
  JC: [-2.5, 1.5],
  KC: [-2.5, -2.5],
  LC: [2.5, -2.5],
};
const CowPenMapVertices = () => {
  const { DEBUG_PHYSICS } = useContext(AppContext);

  const intersectionEnterHandler = ((payload: IntersectionEnterPayload) => {
    const currentVertextName = payload?.target?.colliderObject?.name;

    const entityName = String(
      payload.other.rigidBodyObject?.name
    ) as keyof typeof EntitiesNames;

    if (!currentVertextName || !entityName) return;
    console.table({ entityName, currentVertextName });

    const { FARMER, FWORKER, MWORKER, COW } = EntitiesNames;
    const NPCInsideVertex = [FARMER, FWORKER, MWORKER, COW].includes(
      entityName
    );

    if (NPCInsideVertex) {
      if (COW === entityName) {
        throw new Error(`Player outside boundings`);
      }

      console.log("npc hit " + currentVertextName);
    }
  }) as IntersectionEnterHandler;

  return (
    <RigidBody type={"fixed"}>
      {Object.entries(cowPenVertices).map(([nodeName, [x, z]], i) => {
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
  );
};

export default CowPenMapVertices;
