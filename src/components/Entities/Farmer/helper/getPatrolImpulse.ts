import { Vector3 } from "three";
import { cowPenVertices } from "../../../../containers/scenarios/CowPen/CowPenMapVertices";

export default function getPatrolImpulse(
  currentVertex: string,
  nextVertex: string
): Vector3 {
  const [currentX, currentZ] = cowPenVertices[currentVertex];
  const [nextX, nextZ] = cowPenVertices[nextVertex];

  const holdX = currentX === nextX;
  const impulseX = holdX ? (nextX > currentX ? 1 : -1) : 0;

  const impulseZ = holdX ? 0 : nextZ > currentZ ? 1 : -1;

  return new Vector3(impulseX, 0, impulseZ);
}
