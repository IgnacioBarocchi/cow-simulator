import {
  CollisionEnterHandler,
  CuboidCollider,
  RigidBody,
} from "@react-three/rapier";

import { Hitboxes } from "../../../lib/object3DHelper";
import { PositionalAudio } from "@react-three/drei";
import { useState } from "react";

export default function PhysicalCowCell() {
  /*
  import { useControls } from "leva";

  const { px, pz, dx, dz } = useControls({
    px: { value: 5, max: 30, min: -30, step: 0.1 },
    pz: { value: -1, max: 30, min: -30, step: 0.1 },
    dx: { value: 2, max: 30, min: -30, step: 0.1 },
    dz: { value: 1.2, max: 30, min: -30, step: 0.1 },
  });*/
  const [soundUrl, setSoundUrl] = useState("");

  const collisionEnterHandler = (({ other: { rigidBodyObject } }) => {
    setSoundUrl(
      [Hitboxes.HORNS, Hitboxes.HOOSES].includes(String(rigidBodyObject?.name))
        ? "/sounds/CowPen/cow-hit-cell.mp3"
        : ""
    );
  }) as CollisionEnterHandler;

  return (
    <RigidBody
      type={"fixed"}
      colliders={false}
      restitution={0}
      friction={3}
      density={500}
    >
      <CuboidCollider
        onCollisionEnter={collisionEnterHandler}
        position={[0, 0.5, -2]}
        args={[2, 0.5, 0.05]}
      />

      <CuboidCollider
        onCollisionEnter={collisionEnterHandler}
        position={[0, 0.5, 0.5]}
        args={[2, 0.5, 0.05]}
      />

      <CuboidCollider
        onCollisionEnter={collisionEnterHandler}
        position={[-2, 0.5, -0.75]}
        rotation={[0, Math.PI, 0]}
        args={[0.05, 0.5, 1.2]}
      />

      <CuboidCollider
        onCollisionEnter={collisionEnterHandler}
        position={[2, 0.5, -0.75]}
        rotation={[0, Math.PI, 0]}
        args={[0.05, 0.5, 1.2]}
      />

      <CuboidCollider position={[5, 0.5, 3.5]} args={[2, 0.5, 1.5]} />
      <CuboidCollider position={[5, 0.5, -0.8]} args={[2, 0.5, 1.2]} />
      <CuboidCollider position={[5, 0.5, -4.5]} args={[2, 0.5, 1.2]} />

      <CuboidCollider position={[0, 0.5, -4.5]} args={[2, 0.5, 1.2]} />
      <CuboidCollider position={[0, 0.5, 3.5]} args={[2, 0.5, 1.5]} />

      <CuboidCollider position={[-5, 0.5, -4.5]} args={[2, 0.5, 1.2]} />
      <CuboidCollider position={[-5, 0.5, -0.8]} args={[2, 0.5, 1.2]} />

      <CuboidCollider position={[-5, 0.5, 3.5]} args={[2, 0.5, 1.5]} />
      {soundUrl && (
        <PositionalAudio
          autoplay
          loop={false}
          load
          url={soundUrl}
          distance={0.2}
        />
      )}
    </RigidBody>
  );
}
