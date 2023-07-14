import { Vector3 } from "three";
import { cowPenVertices } from "../../../../containers/scenarios/CowPen/helpers/NPCPositionReducer";

const getPatrolVerticesAvailableValues = () =>
  Object.values(cowPenVertices).reduce(
    (acc: { x: number[]; z: number[] }, vector3: Vector3) => {
      const { x, z } = vector3;

      if (!acc.x.includes(x)) {
        acc.x.push(x);
      }

      if (!acc.z.includes(z)) {
        acc.z.push(z);
      }

      return acc;
    },
    { x: [], z: [] }
  );

const getNearestValue = (axis: "x" | "z", value: number): number => {
  const patrolVerticesAvailableValues =
    getPatrolVerticesAvailableValues()[axis];

  let nearest = patrolVerticesAvailableValues[0];
  let diff = Math.abs(value - nearest);

  for (let i = 1; i < patrolVerticesAvailableValues.length; i++) {
    const currentDiff = Math.abs(value - patrolVerticesAvailableValues[i]);
    if (currentDiff < diff) {
      nearest = patrolVerticesAvailableValues[i];
      diff = currentDiff;
    }
  }

  return nearest;
};

export default function getPatrolImpulse(
  currentVertex: Vector3,
  nextVertex: Vector3,
  NPCWorldPosition: Vector3
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

  const worldPositionX = NPCWorldPosition.x;
  const worldPositionZ = NPCWorldPosition.z;

  const activeAxis = holdX ? "x" : "z";
  const watchedValue = holdX ? worldPositionX : worldPositionZ;
  const nearest = getNearestValue(activeAxis, watchedValue);

  const threshold = 0.1;

  const impulse = new Vector3(impulseXValue, 0, impulseZValue);

  const difference = Math.abs(watchedValue - nearest);
  if (difference > threshold) {
    const adjustment = ((difference - threshold) * threshold) / 3;
    console.log(adjustment);
    if (holdX) {
      impulse.setX(
        watchedValue < nearest
          ? impulseXValue - adjustment
          : impulseXValue + adjustment
      );
    } else {
      impulse.setZ(
        watchedValue < nearest
          ? impulseZValue - adjustment
          : impulseZValue + adjustment
      );
    }
  }

  return impulse;
}
