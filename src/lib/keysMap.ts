export interface Keys {
  forward: boolean;
  backward: boolean;
  leftward: boolean;
  rightward: boolean;
  gallopJump: boolean;
  attackHeadbutt: boolean;
  attackKick: boolean;
  eating: boolean;
}

// todo: Jul 10 - replace by state event keys, don't use its values directly.

const keysMap = [
  { name: "forward", keys: ["ArraowUp", "KeyW"] },
  { name: "backward", keys: ["ArraowDown", "KeyS"] },
  { name: "leftward", keys: ["ArraowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArraowRight", "KeyD"] },
  { name: "gallopJump", keys: ["Space"] },
  { name: "attackHeadbutt", keys: ["KeyJ"] },
  { name: "attackKick", keys: ["KeyK"] },
  { name: "eating", keys: ["KeyL"] },
];

export default keysMap;
