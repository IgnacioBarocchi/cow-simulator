import {
  CapsuleCollider,
  CylinderCollider,
  IntersectionEnterHandler,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import {
  Entity,
  EntityNames,
  EntitySensor,
  SensorNames,
} from "../../../lib/object3DHelper";
import { FC, useContext, useEffect, useMemo, useRef } from "react";
import { Group, Vector3 } from "three";

import { AppContext } from "../../../containers/context/AppContext";
import FWorker3DModel from "../FWorker/FWorker3DModel";
import Farmer3DModel from "../Farmer/Farmer3DModel";
import MWorker3DModel from "../MWorker/MWorker3DModel";
import { Text } from "@react-three/drei";
import cowPenNPCMachine from "../../../machines/CowPenNPCMachine";
import getPatrolImpulse from "./helper/getPatrolImpulse";
import { useCowSimulatorStore } from "../../../store/store";
import { useFrame } from "@react-three/fiber";
import { useMachine } from "@xstate/react";

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
  const { cow3DModelGroup } = useCowSimulatorStore((state) => ({
    cow3DModelGroup: state.cow3DModelGroup,
  }));

  const { DEBUG_PHYSICS } = useContext(AppContext);

  const [machineState, send] = useMachine(cowPenNPCMachine);

  const NPCModel:
    | ((props: any) => JSX.Element)
    | ((props: any) => JSX.Element)
    | ((props: any) => JSX.Element) = {
    [EntityNames.FARMER]: useMemo(
      // @ts-ignore
      () => (props) => <Farmer3DModel {...props} />,
      [entity]
    ),
    [EntityNames.MWORKER]: useMemo(
      // @ts-ignore
      () => (props) => <FWorker3DModel {...props} />,
      [entity]
    ),
    [EntityNames.FWORKER]: useMemo(
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
    if (machineState.matches("idle")) {
      send("WALK");
    }

    if (machineState.matches("walk") || machineState.matches("idle")) {
      NPC3DModelGroup.current.lookAt(nextVertexPosition);
      NPC3DModelGroup.current.rotation.x = 0;
      NPC3DModelGroup.current.rotation.z = 0;
    }
  }, [nextVertexPosition.x, nextVertexPosition.z, machineState.value]);

  useFrame(() => {
    if (!NPC3DModelGroup?.current) return;

    const NPCWorldPosition = NPC3DModelGroup.current.getWorldPosition(
      new Vector3()
    );

    if (!NPCBody?.current) return;
    if (machineState.matches("walk")) {
      NPCBody.current.setLinvel(
        getPatrolImpulse(
          currentVertexPosition,
          nextVertexPosition,
          NPCWorldPosition
        ).multiplyScalar(2),
        false
      );
    }

    if (
      (machineState.matches("punch") || machineState.matches("kick")) &&
      cow3DModelGroup &&
      NPC3DModelGroup?.current
    ) {
      const cowPosition = cow3DModelGroup.getWorldPosition(new Vector3());
      NPC3DModelGroup.current.lookAt(cowPosition);
    }

    if (machineState.matches("interact") && Math.random() > 0.5) {
      NPCBody.current.setLinvel(
        getPatrolImpulse(
          currentVertexPosition,
          nextVertexPosition,
          NPCWorldPosition
        ).multiplyScalar(2.5),
        false
      );
    }
  });

  // @ts-ignore
  // todo type rigidBodyObject
  const intersectionEnterHandlei = (({ other: { rigidBodyObject } }) => {
    const { FARMER, FWORKER, MWORKER, COW } = EntityNames;
    const { COW_SENSOR } = SensorNames;
    const entityOrSensor = rigidBodyObject?.name as Entity | EntitySensor;

    const interactWithCoworkers = [FARMER, FWORKER, MWORKER].includes(
      // @ts-ignore
      entityOrSensor
    );

    const interactingWithCow = [COW, COW_SENSOR].includes(
      // @ts-ignore
      entityOrSensor
    );

    if (interactWithCoworkers) {
      send("INTERACT");
    }

    if (interactingWithCow) {
      send(["PUNCH", "KICK"][Math.floor(Math.random() * 2)]);
    }
  }) as IntersectionEnterHandler;

  return (
    <group ref={NPCGroup}>
      <RigidBody
        name={entity}
        ref={NPCBody}
        lockRotations={true}
        friction={4}
        restitution={2}
        density={62}
        colliders={false}
        position={initialVertext}
      >
        {DEBUG_PHYSICS && (
          <Text
            scale={[0.2, 0.2, 0.2]}
            position={[0, 1.5, 0]}
            color="red"
            anchorX="center"
            anchorY="middle"
          >
            {String(machineState.value)}
          </Text>
        )}
        <CapsuleCollider args={[0.2, 0.2]} position={[0, 0.4, 0]} />
        <CylinderCollider
          sensor
          args={[0.5, 0.5]}
          onIntersectionEnter={intersectionEnterHandlei}
        />
        <group ref={NPC3DModelGroup}>
          <NPCModel {...{ scale: 0.6 }} state={machineState.value} />
        </group>
      </RigidBody>
    </group>
  );
};

export default AbstractPersonel;
