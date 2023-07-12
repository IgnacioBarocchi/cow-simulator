import { cowPenVertices } from "../../../../containers/scenarios/CowPen/CowPenMapVertices";
import getRandomPatrolPath from "../../../../lib/getRandomPatrolPath";

export default function getPatrolCycle(): string[] {
  const rootPath = getRandomPatrolPath(cowPenVertices);
  // @ts-ignore
  return [...rootPath, ...rootPath.toReversed()];
}
