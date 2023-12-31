import { FC } from "react";
import Hitbox from "../../Hitbox/Hitbox";
import { Hitboxes } from "../../../lib/object3DHelper";
import { PositionalAudio } from "@react-three/drei";
import { StateValue } from "xstate";
import { States } from "../../../machines/CowMachine";

const HeadButtCollider: FC<HitboxColliderProps> = ({ orientation }) => {
  return (
    <Hitbox
      rigidBodyProps={{
        name: Hitboxes.HORNS,
        position: [0, 0.7, 0.8],
        density: 1000,
        type: "dynamic",
      }}
      projectile={false}
      physical={true}
      orientation={orientation}
      impulseScale={1}
      shape={"box"}
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
        type: "dynamic",
      }}
      projectile={false}
      physical={true}
      orientation={orientation}
      impulseScale={3}
      shape={"box"}
      boundingSize={0.4}
      Projectile3DModel={undefined}
    />
  );
};

const CowHitbox: FC<CowHitboxProps> = ({ state, orientation }) => {
  if (state === States.attackHeadbutt)
    return (
      <>
        <HeadButtCollider orientation={orientation} />
        <PositionalAudio
          load
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
        <KickCollider orientation={orientation} />
        <PositionalAudio
          load
          autoplay
          loop={false}
          distance={1}
          url="/sounds/Cow/kick.mp3"
        />
      </>
    );
};

export default CowHitbox;

interface HitboxColliderProps {
  orientation: number;
}

interface CowHitboxProps extends HitboxColliderProps {
  state: StateValue;
}
