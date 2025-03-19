import { FC, LegacyRef, useEffect, useRef, useState } from "react";

import { SpotLight } from "@react-three/drei";
import { SpotLightProps } from "@react-three/fiber";
import type { SpotLight as SpotLightType } from "three";
import { publicExperimentalFeatures } from "@mono/context";
import { useControls as useLeva } from "leva";

// todo convert to local atom
const cowIsLoaded = true;

type RelevantProps = Pick<
  SpotLightProps,
  "intensity" | "color" | "angle" | "distance" | "decay" | "penumbra"
> & {
  anglePower: number;
  radiusTop: number;
  radiusBottom: number;
  opacity: number;
  intensity: number;
  color: number;
  angle: number;
  distance: number;
  decay: number;
  penumbra: number;
} & Omit<SpotLightProps, "focus" | "atenuation">;

const SceneSpotLight: FC<{ lightProps: RelevantProps }> = ({ lightProps }) => {
  const light = useRef<LegacyRef<SpotLightType> | undefined>();

  const customProps = useLeva("spotlight props", {
    intensity: { value: lightProps.intensity, min: 0, max: 40, step: 0.1 },
    color: "#fef8dd",
    angle: { value: lightProps.angle, min: 0, max: Math.PI / 2 },
    distance: { value: lightProps.distance, min: 0, max: 100, step: 0.01 },
    decay: { value: lightProps.decay, min: 0, max: 100, step: 0.01 },
    penumbra: { value: lightProps.penumbra, min: 0, max: 100, step: 0.01 },
    anglePower: { value: lightProps.anglePower, min: 0, max: 100, step: 0.01 },
    radiusTop: { value: lightProps.radiusTop, min: 0, max: 100, step: 0.01 },
    radiusBottom: {
      value: lightProps.radiusBottom,
      min: 0,
      max: 100,
      step: 0.01,
    },
    opacity: { value: lightProps.opacity, min: 0, max: 1, step: 0.01 },
  }) as any;

  const [intensity, setIntensity] = useState<number>(
    publicExperimentalFeatures.debug ? customProps.intensity : 0
  );

  useEffect(() => {
    if (cowIsLoaded && !publicExperimentalFeatures.debug) {
      if (!publicExperimentalFeatures.debug) {
        const interval = setInterval(() => {
          setIntensity((prev: number) => {
            if (prev < 40) {
              return Math.min(prev + 1, 40);
            }
            clearInterval(interval);
            return prev;
          });
        }, 50);

        return () => clearInterval(interval);
      } else {
        setIntensity(1);
      }
    }
  }, [cowIsLoaded]);

  return (
    <>
      <SpotLight
        {...lightProps}
        debug={publicExperimentalFeatures.debug}
        intensity={
          publicExperimentalFeatures.debug ? customProps.intensity : intensity
        }
        // @ts-ignore
        ref={light}
      />
      <fogExp2 attach="fog" color="black" density={0.015} />
    </>
  );
};

export default SceneSpotLight;
