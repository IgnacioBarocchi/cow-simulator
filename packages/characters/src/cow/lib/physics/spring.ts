import { Vector3 } from "three";
import { SimulationFrame } from "./SimulationFrame";

export function spring(
  source: number,
  dest: number,
  velocity: number,
  mass: number,
  damping: number
): SimulationFrame {
  let acceleration = dest - source;
  acceleration /= mass;
  velocity += acceleration;
  velocity *= damping;

  const position = source + velocity;

  return new SimulationFrame(position, velocity);
}

export function springV(
  source: THREE.Vector3,
  dest: THREE.Vector3,
  velocity: THREE.Vector3,
  mass: number,
  damping: number
): void {
  const acceleration = new Vector3().subVectors(dest, source);
  acceleration.divideScalar(mass);
  velocity.add(acceleration);
  velocity.multiplyScalar(damping);
  source.add(velocity);
}
