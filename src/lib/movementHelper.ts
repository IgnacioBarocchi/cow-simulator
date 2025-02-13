import { Vector3, Quaternion, Matrix4, MathUtils } from "three";

function applyVectorMatrixXZ(
  a: THREE.Vector3,
  b: THREE.Vector3,
  target: THREE.Vector3
): THREE.Vector3 {
  return target.set(a.x * b.z + a.z * b.x, b.y, a.z * b.z + -a.x * b.x);
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

const getLocalMovementDirection = ({ context, event }) => {
  const positiveX = event.keys.rightward ? -1 : 0;
  const negativeX = event.keys.leftward ? 1 : 0;
  const positiveZ = event.keys.forward ? 1 : 0;
  const negativeZ = event.keys.backward ? -1 : 0;

  return context.movementInfo.localMovementDirection
    .set(positiveX + negativeX, 0, positiveZ + negativeZ)
    .normalize();
};

const updatePositionFromRigidBody = ({ context }) => {
  if (!context.rapierRigidBodyRef.current) return;
  const { x, y, z } = context.rapierRigidBodyRef.current.translation();
  context.movementInfo.position.set(x, y, z);
};

const updateMovementSpring = ({ context, event }) => {
  // Simulator
  context.movementInfo.velocitySimulator.target.copy(
    context.movementInfo.arcadeVelocityTarget
  );
  context.movementInfo.velocitySimulator.simulate(event.timeStep);

  // Update values
  context.movementInfo.velocity.copy(
    context.movementInfo.velocitySimulator.position
  );
};

const updateRotationSpring = ({ context, event }) => {
  // Spring rotation
  // Figure out angle between current and target orientation
  let angle = getSignedAngleBetweenVectors(
    context.movementInfo.orientation,
    context.movementInfo.orientationTarget
  );

  // Simulator
  context.movementInfo.rotationSimulator.target = angle;
  context.movementInfo.rotationSimulator.simulate(event.timeStep * 1.74);
  let rot = context.movementInfo.rotationSimulator.position;

  // Updating values
  context.movementInfo.orientation.applyAxisAngle(new Vector3(0, 1, 0), rot);
  context.movementInfo.angularVelocity =
    context.movementInfo.rotationSimulator.velocity;
};

const updateModelRotation = ({ context }) => {
  const rotationQuaternion = new Quaternion();
  const rotationMatrix = new Matrix4();
  const zeroVec = new Vector3(0, 0, 0);
  const upVec = new Vector3(0, 1, 0);
  rotationQuaternion.setFromRotationMatrix(
    rotationMatrix.lookAt(context.movementInfo.orientation, zeroVec, upVec)
  );
  context.mesh3DRef.current?.quaternion.copy(rotationQuaternion);
};

const setOrientation = (context, vec) => {
  const lookVector = new Vector3().copy(vec).setY(0).normalize();
  context.movementInfo.orientationTarget.copy(lookVector);
};

const getCameraRelativeMovementVector = ({ context, event }) => {
  const flatViewVector = new Vector3();
  const cameraRelativeMovementVector = new Vector3();
  flatViewVector
    .set(
      context.movementInfo.viewVector.x,
      0,
      context.movementInfo.viewVector.z
    )
    .normalize();
  return applyVectorMatrixXZ(
    flatViewVector,
    getLocalMovementDirection({ context, event }),
    cameraRelativeMovementVector
  );
};

const updateOrientationTarget = ({ context, event }) => {
  let moveVector = getCameraRelativeMovementVector({ context, event });
  const noInputDirection =
    moveVector.x === 0 && moveVector.y === 0 && moveVector.z === 0;
  if (noInputDirection) {
    context.movementInfo.arcadeVelocityTarget.z = 0;
    setOrientation(context, context.movementInfo.orientation);
  } else {
    context.movementInfo.arcadeVelocityTarget.z = 1;
    setOrientation(context, moveVector);
  }
};

const updateViewVector = ({ context, event }) => {
  context.movementInfo.viewVector.subVectors(
    context.movementInfo.position,
    event.camera.position
  );
};

const updateMovement = ({ context, event }) => {
  updatePositionFromRigidBody({ context, event });
  updateViewVector({ context, event });
  updateOrientationTarget({ context, event });
  updateMovementSpring({ context, event });
  updateRotationSpring({ context, event });
  updateModelRotation({ context, event });
};

export default updateMovement;
