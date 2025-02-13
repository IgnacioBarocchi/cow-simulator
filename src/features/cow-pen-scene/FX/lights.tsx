import { SpotLight } from "@react-three/drei";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { cowLoadedAtom } from "../../../store/store";
// const { position, angle, penumbra, intensity, distance, decay, color } =
//   useControls({
//     position: { value: [0, 4.5, 0], step: 0.1 },
//     angle: { value: 0.73, min: 0, max: Math.PI / 2 },
//     penumbra: { value: 44, min: 0, max: 100, step: 1 },
//     intensity: { value: 40, min: 0, max: 100, step: 1 },
//     distance: { value: 10.4, min: 0, max: 100, step: 1 },
//     decay: { value: 5, min: 1, max: 100, step: 1 },
//     color: { value: "#fef8dd" },
//   });
// position={position}
// angle={angle}
// penumbra={penumbra}
// intensity={intensity}
// distance={distance}
// decay={decay}
// color={color}
// castShadow

const CowPenLights = () => {
  const [cowIsLoaded] = useAtom(cowLoadedAtom);
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    if (cowIsLoaded) {
      const interval = setInterval(() => {
        setIntensity((prev) => {
          if (prev < 40) {
            return Math.min(prev + 1, 40); // Increment intensity to a maximum of 40
          }
          clearInterval(interval); // Clear interval when max intensity reached
          return prev;
        });
      }, 50); // Adjust the duration of the transition as needed

      return () => clearInterval(interval); // Cleanup on unmount
    } else {
      setIntensity(1); // Reset intensity if cowIsLoaded is false
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
