import { Vector3, MathUtils } from "three";

export function lerpVectors(
  vectorA: Vector3,
  vectorB: Vector3,
  vectorT: Vector3,
  target: Vector3
): Vector3 {
  return target.set(
    MathUtils.lerp(vectorA.x, vectorB.x, vectorT.x),
    MathUtils.lerp(vectorA.y, vectorB.y, vectorT.y),
    MathUtils.lerp(vectorA.z, vectorB.z, vectorT.z)
  );
}

/**
 * Finds an angle between two vectors
 * @param {THREE.Vector3} v1
 * @param {THREE.Vector3} v2
 */
export function getAngleBetweenVectors(
  v1: THREE.Vector3,
  v2: THREE.Vector3,
  dotTreshold: number = 0.0005
): number {
  let angle: number;
  let dot = v1.dot(v2);

  // If dot is close to 1, we'll round angle to zero
  if (dot > 1 - dotTreshold) {
    angle = 0;
  } else {
    // Dot too close to -1
    if (dot < -1 + dotTreshold) {
      angle = Math.PI;
    } else {
      // Get angle difference in radians
      angle = Math.acos(dot);
    }
  }

  return angle;
}

/**
 * Finds an angle between two vectors with a sign relative to normal vector
 */
const UP = new Vector3(0, 1, 0);
const cross = new Vector3();
export function getSignedAngleBetweenVectors(
  v1: THREE.Vector3,
  v2: THREE.Vector3,
  normal = UP,
  dotTreshold = 0.0005
): number {
  let angle = getAngleBetweenVectors(v1, v2, dotTreshold);

  // Get vector pointing up or down
  cross.crossVectors(v1, v2);
  // Compare cross with normal to find out direction
  if (normal.dot(cross) < 0) {
    angle = -angle;
  }

  return angle;
}

/**
 * Constructs a 2D matrix from first vector, replacing the Y axes with the global Y axis,
 * and applies this matrix to the second vector. Saves performance when compared to full 3D matrix application.
 * Useful for character rotation, as it only happens on the Y axis.
 * @param {Vector3} a Vector to construct 2D matrix from
 * @param {Vector3} b Vector to apply basis to
 */
export function applyVectorMatrixXZ(
  a: THREE.Vector3,
  b: THREE.Vector3,
  target: THREE.Vector3
): THREE.Vector3 {
  return target.set(a.x * b.z + a.z * b.x, b.y, a.z * b.z + -a.x * b.x);
}
