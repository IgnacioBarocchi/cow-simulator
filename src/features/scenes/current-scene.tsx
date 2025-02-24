import CowPenScene from "./cow-pen-scene";
import LVL2 from "./cow-parlor-scene";
import SceneSpotLight from "./FX/lights";
import { degToRad } from "three/src/math/MathUtils.js";
import { selectedSceneAtom } from "../scene-selector";
import { useAtom } from "jotai";
import { useMemo } from "react";

const lightPresets = {
  cow_pen: {
    intensity: 40,
    position: [0, 4.5, 0],
    angle: 0.73,
    penumbra: 26.5,
    distance: 37.2,
    decay: 26.6,
    anglePower: 16.46,
    radiusTop: 0,
    radiusBottom: 28.2,
    color: "#fef8dd",
    castShadow: true,
    volumetric: true,
    opacity: 1,
  },
  cow_parlor: {
    position: [-3, 3, -1],
    rotation: [0, degToRad(30), 0],
    angle: 0.73,
    penumbra: 44,
    distance: 10.4,
    decay: 5,
    color: "#white",
    castShadow: true,
  },
};

const indexedPresets = Object.values(lightPresets);

const Fallback = () => null;

const CurrentScene = () => {
  const [index] = useAtom(selectedSceneAtom);
  const Scenario =
    useMemo(() => [() => <CowPenScene />, () => <LVL2 />][index], [index]) ||
    Fallback;

  return (
    <>
      <Scenario />
      <SceneSpotLight lightProps={indexedPresets[index]} />
    </>
  );
};

export default CurrentScene;
