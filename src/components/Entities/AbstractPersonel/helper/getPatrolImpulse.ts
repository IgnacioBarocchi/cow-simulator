import { Vector3 } from "three";

export default function getPatrolImpulse(
  currentVertex: Vector3,
  nextVertex: Vector3
): Vector3 {
  const currentX = currentVertex?.x;
  const currentZ = currentVertex?.z;
  const nextX = nextVertex?.x;
  const nextZ = nextVertex?.z;
  if (!currentX || !currentZ || !nextX || !nextZ) return new Vector3(0, 0, 0);
  const holdX = currentX === nextX;
  const holdZ = currentZ === nextZ;
  const goRight = !holdX && nextX > currentX;
  const goLeft = !holdX && nextX < currentX;

  const goUp = !holdZ && nextZ > currentZ;
  const goDown = !holdZ && nextZ < currentZ;

  const impulseXValue = goRight ? 1 : goLeft ? -1 : 0;
  const impulseZValue = goUp ? 1 : goDown ? -1 : 0;
  const impulse = new Vector3(impulseXValue, 0, impulseZValue);
  return impulse;
}
