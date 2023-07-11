import { FC } from "react";
import { Hitboxes } from "../../../lib/object3DHelper";
import Hitbox from "../../Hitbox/Hitbox";
import { StateValue } from "xstate";
import { States } from "../../../machines/CowMachine";
import { PositionalAudio } from "@react-three/drei";

const HeadButtCollider: FC<HitboxColliderProps> = ({ orientation }) => {
  return (
    <Hitbox
      rigidBodyProps={{
        name: Hitboxes.HORNS,
        position: [0, 0.7, 0.8],
        density: 1000,
        type: "fixed",
      }}
      projectile={false}
      physical={false}
      orientation={orientation}
      impulseScale={1}
      shape={"ball"}
      boundingSize={0.4}
      Projectile3DModel={undefined}
    />
  );
};

const KickCollider: FC<HitboxColliderProps> = ({ orientation }) => {
  return (
    <Hitbox
      rigidBodyProps={{
        name: Hitboxes.HOOSES,
        position: [0, 0.7, -0.8],
        density: 1000,
        type: "fixed",
      }}
      projectile={false}
      physical={false}
      orientation={orientation}
      impulseScale={3}
      shape={"ball"}
      boundingSize={0.4}
      Projectile3DModel={undefined}
    />
  );
};

const CowHitbox: FC<CowHitboxProps> = ({ state, orientation }) => {
  if (state === States.attackHeadbutt)
    return (
      <>
        <HeadButtCollider orientation={orientation} />;
        <PositionalAudio
          autoplay
          loop={false}
          distance={1}
          url="/sounds/Cow/kick.mp3"
        />
      </>
    );

  if (state === States.attackKick)
    return (
      <>
        <KickCollider orientation={orientation} />;
        <PositionalAudio
          autoplay
          loop={false}
          distance={1}
          url="/sounds/Cow/kick.mp3"
        />
      </>
    );

  return <></>;
};

export default CowHitbox;

interface HitboxColliderProps {
  orientation: number;
}

interface CowHitboxProps extends HitboxColliderProps {
  state: StateValue;
}
