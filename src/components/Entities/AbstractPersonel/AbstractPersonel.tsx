import { useFrame } from "@react-three/fiber";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { FC, useEffect, useMemo, useRef } from "react";
import { Group, Vector3 } from "three";
import getPatrolImpulse from "./helper/getPatrolImpulse";
import { EntitiesNames } from "../../../lib/object3DHelper";
import Farmer3DModel from "../Farmer/Farmer3DModel";
import FWorker3DModel from "../FWorker/FWorker3DModel";
import MWorker3DModel from "../MWorker/MWorker3DModel";

export const AbstractPersonel: FC<{
  entity: "FARMER" | "MWORKER" | "FWORKER";
  initialVertext: Vector3;
  currentVertexPosition: Vector3;
  nextVertexPosition: Vector3;
}> = ({
  initialVertext,
  currentVertexPosition,
  nextVertexPosition,
  entity,
}) => {
  const NPCModel:
    | ((props: any) => JSX.Element)
    | ((props: any) => JSX.Element)
    | ((props: any) => JSX.Element) = {
    [EntitiesNames.FARMER]: useMemo(
      // @ts-ignore
      () => (props) => <Farmer3DModel {...props} />,
      [entity]
    ),
    [EntitiesNames.MWORKER]: useMemo(
      // @ts-ignore
      () => (props) => <FWorker3DModel {...props} />,
      [entity]
    ),
    [EntitiesNames.FWORKER]: useMemo(
      // @ts-ignore
      () => (props) => <MWorker3DModel {...props} />,
      [entity]
    ),
  }[entity];

  const NPCBody = useRef<RapierRigidBody>(null);
  const NPCGroup = useRef<Group>(null);
  const NPC3DModelGroup = useRef<Group>(null);

  useEffect(() => {
    if (!NPC3DModelGroup?.current) return;
    NPC3DModelGroup.current.lookAt(nextVertexPosition);
    NPC3DModelGroup.current.rotation.x = 0;
    NPC3DModelGroup.current.rotation.z = 0;
  }, [nextVertexPosition.x, nextVertexPosition.z]);

  useFrame(() => {
    if (!NPCBody?.current) return;

    NPCBody.current.setLinvel(
      getPatrolImpulse(
        currentVertexPosition,
        nextVertexPosition
      ).multiplyScalar(2),
      false
    );
  });

  return (
    <group ref={NPCGroup}>
      <RigidBody
        name={entity}
        ref={NPCBody}
        lockRotations={true}
        friction={4}
        restitution={0.5}
        density={62}
        colliders={false}
        position={initialVertext}
      >
        <CapsuleCollider args={[0.2, 0.2]} position={[0, 0.4, 0]} />
        <group ref={NPC3DModelGroup}>
          <NPCModel scale={0.6} />
        </group>
      </RigidBody>
    </group>
  );
};

export default AbstractPersonel;
