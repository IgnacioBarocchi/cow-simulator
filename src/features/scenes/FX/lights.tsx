import { SpotLight } from "@react-three/drei";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { cowLoadedAtom } from "../../../store/store";
import { SpotLightProps } from "@react-three/fiber";

const SceneSpotLight: FC<{ lightProps: Omit<SpotLightProps, "intensity"> }> = ({
  lightProps,
}) => {
  const [cowIsLoaded] = useAtom(cowLoadedAtom);
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    if (cowIsLoaded) {
      const interval = setInterval(() => {
        setIntensity((prev) => {
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
  }, [cowIsLoaded]);

  return (
    <>
      <SpotLight {...({ intensity, ...lightProps } as SpotLightProps)} />
      <fogExp2 attach="fog" color="black" density={0.15} />
    </>
  );
};

export default SceneSpotLight;
