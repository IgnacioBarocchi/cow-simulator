import { RepeatWrapping, Texture, Euler, Vector3 } from "three";

const BASE_PATH = "/images";

export const GroundPresets = {
  Dirt: "Dirt",
} as const;

export const texturePathsByPreset: TexturePathsByPreset = {
  [GroundPresets.Dirt]: {
    map: `${BASE_PATH}/dirt_texture/dirt_albedo.png`,
    displacementMap: `${BASE_PATH}/dirt_texture/dirt_displace.png`,
    normalMap: `${BASE_PATH}/dirt_texture/dirt_normal.png`,
    roughnessMap: `${BASE_PATH}/dirt_texture/dirt_rough.png`,
  },
};

const getTileSize = (
  preset: GroundPreset,
  surfaceSize: number
): [number, number] => {
  if (preset === GroundPresets.Dirt) {
    return [surfaceSize, surfaceSize];
  }
  return [surfaceSize, surfaceSize];
};

const tileTexture = (
  preset: GroundPreset,
  surfaceSize: number
): ((value: Texture, index: number, array: Texture[]) => Texture) => {
  const [tx, ty] = getTileSize(preset, surfaceSize);

  return (texture: Texture) => {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(tx, ty);
    return texture;
  };
};

const getMaps = (
  preset: GroundPreset,
  textures: Texture[]
): TexturesResult | undefined => {
  if (preset === GroundPresets.Dirt) {
    const [map, _, normalMap, roughnessMap] = textures;
    return { map, normalMap, roughnessMap };
  }
};

export const getTextureMapsResult = (
  useTexture: (input: string[]) => Texture[],
  preset: GroundPreset,
  surfaceSize: number
) =>
  getMaps(
    preset,
    useTexture(Object.values(texturePathsByPreset[preset])).map(
      tileTexture(preset, surfaceSize)
    )
  ) ?? {};

export type GroundPreset = keyof typeof GroundPresets;

export interface GroundProps {
  position: [number, number, number] | Vector3;
  rotation?: Euler;
  preset: GroundPreset;
  surfaceSize: number;
}

type MaterialMaps = {
  albedo?: string;
  rough?: string;
  map?: string;
  lightMap?: string;
  aoMap?: string;
  emissiveMap?: string;
  bumpMap?: string;
  normalMap?: string;
  normalMapType?: string;
  displacementMap?: string;
  roughnessMap?: string;
  metalnessMap?: string;
  alphaMap?: string;
  envMap?: string;
};

type TexturesResult = {
  [key in keyof MaterialMaps]: Texture;
};

type TexturePathsByPreset = {
  [key in GroundPreset]: MaterialMaps;
};
