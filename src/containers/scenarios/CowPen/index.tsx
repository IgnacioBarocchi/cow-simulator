import { Dooads, ModelUrlByName } from "../../../lib/object3DHelper";

import { AppContext } from "../../context/AppContext";
import Cow from "../../../components/Entities/Cow";
import CowPenControlledNPC from "./CowPenControlledNPC";
import CowPenLight from "./CowPenLight";
import CowPenMapBounding from "./CowPenMapBounding";
import { GroundPresets } from "../../../lib/textureHelper";
import Instancer from "../../../components/Utility/Instancer/Instancer";
import PhysicalCowCell from "./PhysicalCowCell";
import { Physics } from "@react-three/rapier";
import Platform from "../../../components/Platform/Platform";
import { PositionalAudio } from "@react-three/drei";
import { useContext } from "react";

const CowPen = () => {
  const { USE_SCENE_LIGHTS, USE_ORBIT_CONTROLS, DEBUG_PHYSICS } =
    useContext(AppContext);

  return (
    <>
      <CowPenLight useSceneLights={USE_SCENE_LIGHTS} />
      <Physics timeStep="vary" debug={DEBUG_PHYSICS}>
        <CowPenMapBounding />
        <CowPenControlledNPC />
        <PhysicalCowCell />
        <Instancer
          numberOfInstances={9}
          url={ModelUrlByName[Dooads.COW_CELL]}
          columns={3}
          offsetX={5}
          offsetY={0}
          offsetZ={4}
          rows={1}
          groupPosition={[-10, 0, -8]}
          groupRotation={[0, Math.PI * 2, 0]}
        />
        <Platform size={10} preset={GroundPresets.Dirt} />
        <Cow useOrbitControls={USE_ORBIT_CONTROLS} />
        <PositionalAudio
          load
          autoplay
          loop
          url="/sounds/CowPen/ambient.mp3"
          distance={0.2}
        />
      </Physics>
    </>
  );
};

export default CowPen;
