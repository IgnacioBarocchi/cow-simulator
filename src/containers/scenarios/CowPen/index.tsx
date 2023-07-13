import { Physics } from "@react-three/rapier";
import Cow from "../../../components/Entities/Cow";
import Platform from "../../../components/Platform/Platform";
import PhysicalCowCell from "./PhysicalCowCell";
import Instancer from "../../../components/Utility/Instancer/Instancer";
import CowPenLight from "./CowPenLight";
import { GroundPresets } from "../../../lib/textureHelper";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Dooads, ModelUrlByName } from "../../../lib/object3DHelper";
import { PositionalAudio } from "@react-three/drei";
import Farmer from "../../../components/Entities/Farmer/Farmer";
import CowPenMapBounding from "./CowPenMapBounding";
import CowPenMapVertices from "./CowPenMapVertices";

const CowPen = () => {
  const { USE_SCENE_LIGHTS, USE_ORBIT_CONTROLS, DEBUG_PHYSICS } =
    useContext(AppContext);

  return (
    <>
      <CowPenLight useSceneLights={USE_SCENE_LIGHTS} />
      <Physics timeStep="vary" debug={DEBUG_PHYSICS}>
        <CowPenMapBounding />
        <CowPenMapVertices />
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
        <PositionalAudio
          load
          autoplay
          loop
          url="/sounds/CowPen/ambient.mp3"
          distance={0.2}
        />
        <Platform size={10} preset={GroundPresets.Dirt} />
        <Cow useOrbitControls={USE_ORBIT_CONTROLS} />
      </Physics>
    </>
  );
};

export default CowPen;
