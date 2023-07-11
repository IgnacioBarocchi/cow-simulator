const BASE_PATH = "/models";

export const EntitiesNames = {
  COW: "COW",
} as const;

export const Dooads = {
  COW_CELL: "COW_CELL",
} as const;

export const ModelUrlByName = {
  [EntitiesNames.COW]: `${BASE_PATH}/Cow.gltf`,
  [Dooads.COW_CELL]: `${BASE_PATH}/Cowcell.gltf`,
};
