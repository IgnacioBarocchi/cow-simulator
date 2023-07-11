import { useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import gsap from "gsap";
import { SpotLight } from "three";

const CowPenLight: FC<{ useSceneLights: boolean }> = ({ useSceneLights }) => {
  const lightRef = useRef<SpotLight>(null);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    const elapsedTime = clock.getElapsedTime();

    const dimmingFactor = Math.sin(elapsedTime) * 0.4 + 0.6;
    const targetPower = dimmingFactor * 0.8 + 0.2;

    gsap.to(lightRef.current, {
      power: targetPower,
      duration: 3,
    });
  });

  if (useSceneLights) {
    return (
      <spotLight
        ref={lightRef}
        power={2}
        castShadow
        position={[-2.4, 4, 0.5]}
        decay={0.5}
        penumbra={0.8}
        rotation={[Math.PI, Math.PI * 1.5, Math.PI * 1.5]}
      />
    );
  }

  return <ambientLight intensity={1} />;
};

export default CowPenLight;
