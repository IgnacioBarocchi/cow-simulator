import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import Farmer3DModel from "./Farmer3DModel";
import { useEffect, useRef, useState } from "react";
import getPatrolCycle from "./helper/getPatrolCycles";
import { useFrame } from "@react-three/fiber";
import getPatrolImpulse from "./helper/getPatrolImpulse";
import { Group, Vector3 } from "three";
import { cowPenVertices } from "../../../containers/scenarios/CowPen/CowPenControlledNPC";
import { EntityNames } from "../../../lib/object3DHelper";

const Farmer = () => {
  const [patrolCycle, setPatrolCycle] = useState<string[]>([]);
  const [vertextIndex, setVertextIndex] = useState<number>(0);
  const [initialPosition, setInitialPostion] = useState<
    [number, number, number]
  >(
    [-2.5, 0, 1.5]

    // [-4.5, 0, -2.5]
  );

  const farmerBody = useRef<RapierRigidBody>(null);
  const farmerGroup = useRef<Group>(null);

  useEffect(() => {
    if (patrolCycle?.length > 0) return;
    const randomPatrolCycle = getPatrolCycle();
    const [startX, startZ] = cowPenVertices[randomPatrolCycle[0]];

    setInitialPostion([startX, 0, startZ]);
    setPatrolCycle(randomPatrolCycle);
  });

  useFrame(() => {
    if (
      patrolCycle?.length === 0 ||
      !farmerBody?.current ||
      !farmerGroup?.current
    ) {
      return;
    }

    const currentWorldPosition = farmerGroup?.current.getWorldPosition(
      new Vector3()
    );

    const currentNameVertext = patrolCycle[vertextIndex];
    const nextNameVertext = patrolCycle[vertextIndex + 1];

    const [nextVertexXPosition, nextVertexZPosition] =
      cowPenVertices[nextNameVertext];

    farmerBody.current.applyImpulse(
      getPatrolImpulse(currentNameVertext, nextNameVertext).multiplyScalar(2),
      true
    );

    if (
      currentWorldPosition.x === nextVertexXPosition ||
      currentWorldPosition.z === nextVertexZPosition
    ) {
      alert("a");
      farmerBody.current.applyImpulse(new Vector3(0, 0, 0), true);
      setVertextIndex((prev) => prev + 1);
    }
  });

  return (
    <group ref={farmerGroup}>
      <RigidBody
        name={EntityNames.FARMER}
        ref={farmerBody}
        lockRotations={true}
        friction={4}
        restitution={0}
        density={62}
        colliders={false}
        position={initialPosition}
      >
        <CapsuleCollider args={[0.2, 0.2]} position={[0, 0.4, 0]} />
        <Farmer3DModel scale={0.6} />
      </RigidBody>
    </group>
  );
};

export default Farmer;
