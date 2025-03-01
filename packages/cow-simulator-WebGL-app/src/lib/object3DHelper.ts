const BASE_PATH = "/models";

export const EntityNames = {
  COW: "COW",
  FARMER: "FARMER",
  MWORKER: "MWORKER",
  FWORKER: "FWORKER",
} as const;

export const SensorNames = {
  COW_SENSOR: "COW_SENSOR",
} as const;

export const Dooads = {
  COW_CELL: "COW_CELL",
} as const;

export const ModelUrlByName = {
  [EntityNames.COW]: `${BASE_PATH}/Cow.gltf`,
  [Dooads.COW_CELL]: `${BASE_PATH}/Cowcell.gltf`,
};

export const Hitboxes = {
  HORNS: "HORNS",
  HOOSES: "HOOSES",
};

export type Hitbox = (typeof Hitboxes)[keyof typeof Hitboxes];
export type Entity = (typeof EntityNames)[keyof typeof EntityNames];
export type EntitySensor = (typeof SensorNames)[keyof typeof SensorNames];
