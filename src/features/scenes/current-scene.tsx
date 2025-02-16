import { useAtom } from "jotai";
import SceneSpotLight from "./FX/lights";
import LVL2 from "./cow-parlor-scene";
import { selectedSceneAtom } from "../scene-selector";
import { useMemo } from "react";
import CowPenScene from "./cow-pen-scene";
import { degToRad } from "three/src/math/MathUtils.js";

const lightPresets = {
  cow_pen: {
    position: [0, 4.5, 0],
    angle: 0.73,
    penumbra: 44,
    distance: 10.4,
    decay: 5,
    color: "#fef8dd",
    castShadow: true,
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
