import { Box, useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { GroundPreset, getTextureMapsResult } from "../../lib/textureHelper";
import { FC } from "react";

const Platform: FC<{ size: number; preset: GroundPreset }> = ({
  size,
  preset,
}) => {
  const { map, displacementMap, normalMap, aoMap, roughnessMap } =
    getTextureMapsResult(useTexture, preset, size);

  return (
    <RigidBody colliders={"cuboid"} type={"fixed"}>
      <Box receiveShadow args={[size, 0.1, size]}>
        <meshStandardMaterial
          map={map}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
        />
      </Box>
    </RigidBody>
  );
};

export default Platform;
