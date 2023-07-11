const BASE_PATH = "/models";

export const EntitiesNames = {
  COW: "COW",
  FARMER: "FARMER",
  MWORKER: "MWORKER",
  FWORKER: "FWORKER",
} as const;

export const Dooads = {
  COW_CELL: "COW_CELL",
} as const;

export const ModelUrlByName = {
  [EntitiesNames.COW]: `${BASE_PATH}/Cow.gltf`,
  [Dooads.COW_CELL]: `${BASE_PATH}/Cowcell.gltf`,
};

export const Hitboxes = {
  HORNS: "HORNS",
  HOOSES: "HOOSES",
};

export type Hitbox = (typeof Hitboxes)[keyof typeof Hitboxes];
export type Entity = (typeof EntitiesNames)[keyof typeof EntitiesNames];
