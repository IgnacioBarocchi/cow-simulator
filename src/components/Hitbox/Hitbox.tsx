import { useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import { FC, ReactNode, useRef } from "react";
import getHitboxImpulse from "./helper/getHitboxImpulse";
import type { Hitbox } from "../../lib/object3DHelper";

const Hitbox: FC<HitboxProps> = ({
  projectile,
  physical,
  rigidBodyProps,
  orientation,
  impulseScale,
  shape,
  boundingSize,
  Projectile3DModel,
}) => {
  const hitboxBody = useRef<RapierRigidBody>(null);

  useFrame(() => {
    if (!hitboxBody.current) {
      return;
    }

    if (rigidBodyProps.type !== "fixed") {
      const impulse = getHitboxImpulse(orientation);

      if (projectile) {
        impulse.multiplyScalar(impulseScale);
      }

      hitboxBody.current.applyImpulse(impulse, false);
    }
  });

  return (
    <group>
      <RigidBody
        ref={hitboxBody}
        {...rigidBodyProps}
        name={rigidBodyProps.name}
      >
        {shape === "box" ? (
          <CuboidCollider
            sensor={!physical}
            args={[boundingSize, boundingSize, boundingSize]}
          />
        ) : (
          <BallCollider sensor={!physical} args={[boundingSize]} />
        )}
        {
          //   @ts-ignore
          Projectile3DModel ? <Projectile3DModel /> : null
        }
      </RigidBody>
    </group>
  );
};

export default Hitbox;

interface HitboxProps {
  rigidBodyProps: RigidBodyProps;
  projectile: boolean;
  physical: boolean;
  orientation: number;
  impulseScale: number;
  shape: "box" | "ball";
  boundingSize: number;
  Projectile3DModel?: ReactNode;
}
