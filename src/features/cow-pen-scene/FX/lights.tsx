import { SpotLight } from "@react-three/drei";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { cowLoadedAtom } from "../../../store/store";

const CowPenLights = () => {
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
      <SpotLight
        {...{
          position: [0, 4.5, 0],
          angle: 0.73,
          penumbra: 44,
          intensity: intensity,
          distance: 10.4,
          decay: 5,
          color: "#fef8dd",
          castShadow: true,
        }}
      />
      <fogExp2 attach="fog" color="black" density={0.15} />
    </>
  );
};

export default CowPenLights;
