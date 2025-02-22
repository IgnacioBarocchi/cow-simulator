import { Matrix4, Quaternion, Vector3 } from "three";

import { lerpVectors } from "../features/character/controller/helpers";

function applyVectorMatrixXZ(
  a: THREE.Vector3,
  b: THREE.Vector3,
  target: THREE.Vector3
): THREE.Vector3 {
  return target.set(a.x * b.z + a.z * b.x, b.y, a.z * b.z + -a.x * b.x);
}

/**
 * Finds an angle between two vectors
 */
export function getAngleBetweenVectors(
  v1: THREE.Vector3,
  v2: THREE.Vector3,
  dotTreshold = 0.0005
): number {
  let angle: number;
  const dot = v1.dot(v2);

  if (dot > 1 - dotTreshold) {
    angle = 0;
  } else if (dot < -1 + dotTreshold) {
    angle = Math.PI;
  } else {
    angle = Math.acos(dot);
  }

  return angle;
}

const UP = new Vector3(0, 1, 0);
const cross = new Vector3();
export function getSignedAngleBetweenVectors(
  v1: THREE.Vector3,
  v2: THREE.Vector3,
  normal = UP,
  dotTreshold = 0.0005
): number {
  let angle = getAngleBetweenVectors(v1, v2, dotTreshold);
  cross.crossVectors(v1, v2);
  if (normal.dot(cross) < 0) {
    angle = -angle;
  }
  return angle;
}

const getLocalMovementDirection = ({ context, event, updateContext }) => {
  const positiveX = event.input.rightward ? -1 : 0;
  const negativeX = event.input.leftward ? 1 : 0;
  const positiveZ = event.input.forward ? 1 : 0;
  const negativeZ = event.input.backward ? -1 : 0;

  updateContext({
    movementInfo: {
      ...context.movementInfo,
      localMovementDirection: new Vector3(positiveX + negativeX, 0, positiveZ + negativeZ).normalize()
    }
  });
};

const updatePositionFromRigidBody = ({ context, updateContext }) => {
  if (!context.rapierRigidBodyRef.current) return;
  const { x, y, z } = context.rapierRigidBodyRef.current.translation();
  updateContext({
    movementInfo: {
      ...context.movementInfo,
      position: new Vector3(x, y, z)
    }
  });
};

const updateMovementSpring = ({ context, event, updateContext }) => {
  context.movementInfo.velocitySimulator.target.copy(
    context.movementInfo.arcadeVelocityTarget
  );
  context.movementInfo.velocitySimulator.simulate(event.timeStep);

  updateContext({
    movementInfo: {
      ...context.movementInfo,
      velocity: context.movementInfo.velocitySimulator.position.clone()
    }
  });
};

const updateRotationSpring = ({ context, event, updateContext }) => {
  const angle = getSignedAngleBetweenVectors(
    context.movementInfo.orientation,
    context.movementInfo.orientationTarget
  );

  context.movementInfo.rotationSimulator.target = angle;
  context.movementInfo.rotationSimulator.simulate(event.timeStep * 1.74);

  const rot = context.movementInfo.rotationSimulator.position;
  const newOrientation = context.movementInfo.orientation.clone().applyAxisAngle(new Vector3(0, 1, 0), rot);

  updateContext({
    movementInfo: {
      ...context.movementInfo,
      orientation: newOrientation,
      angularVelocity: context.movementInfo.rotationSimulator.velocity
    }
  });
};

const updateModelRotation = ({ context, updateContext }) => {
  const rotationQuaternion = new Quaternion();
  const rotationMatrix = new Matrix4();
  rotationQuaternion.setFromRotationMatrix(
    rotationMatrix.lookAt(context.movementInfo.orientation, new Vector3(0, 0, 0), new Vector3(0, 1, 0))
  );
  if (context.mesh3DRef.current) {
    context.mesh3DRef.current.quaternion.copy(rotationQuaternion);
  }
};

const setOrientation = (context, vec, updateContext) => {
  const lookVector = new Vector3().copy(vec).setY(0).normalize();
  updateContext({
    movementInfo: {
      ...context.movementInfo,
      orientationTarget: lookVector
    }
  });
};

const updateOrientationTarget = ({ context, event, updateContext }) => {
  context.movementInfo.arcadeVelocityTarget.z = 1;
  updateContext({
    movementInfo: {
      ...context.movementInfo,
      arcadeVelocityTarget: context.movementInfo.arcadeVelocityTarget
    }
  });
  setOrientation(context, new Vector3(0, 0, 0), updateContext);
  // const moveVector = getLocalMovementDirection({ context, event, updateContext });
  // if (moveVector.length() === 0) {
  //   updateContext({
  //     movementInfo: {
  //       ...context.movementInfo,
  //       arcadeVelocityTarget: new Vector3(0, 0, 0)
  //     }
  //   });
  // } else {
  //   updateContext({
  //     movementInfo: {
  //       ...context.movementInfo,
  //       arcadeVelocityTarget: new Vector3(0, 0, 1)
  //     }
  //   });
  //   setOrientation(context, moveVector, updateContext);
  // }
};
// const updateOrientationTarget = ({ context, event }) => {
//   const moveVector = getCameraRelativeMovementVector({ context, event });
//   const noInputDirection =
//     moveVector.x === 0 && moveVector.y === 0 && moveVector.z === 0;
//   if (noInputDirection) {
//     context.movementInfo.arcadeVelocityTarget.z = 0;
//     setOrientation(context, context.movementInfo.orientation);
//   } else {
//     context.movementInfo.arcadeVelocityTarget.z = 1;
//     setOrientation(context, moveVector);
//   }
// };

const updateMovement = ({ context, event, updateContext }) => {
  updatePositionFromRigidBody({ context, updateContext });
  updateOrientationTarget({ context, event, updateContext });
  updateMovementSpring({ context, event, updateContext });
  updateRotationSpring({ context, event, updateContext });
  updateModelRotation({ context, updateContext });


  //   updatePositionFromRigidBody({ context, event, newMovementInfo });
  //   updateViewVector({ context, event, newMovementInfo });
  //   updateOrientationTarget({ context, event, newMovementInfo });
  //   updateMovementSpring({ context, event, newMovementInfo });
  //   updateRotationSpring({ context, event, newMovementInfo });
  //   updateModelRotation({ context, event, newMovementInfo });
  //   updateContext({ movementInfo: newMovementInfo });
};

export default updateMovement;

// // todo all are pure functions without side effects!!! need to assing the context again.

// import { Matrix4, Quaternion, Vector3 } from "three";

// import { lerpVectors } from "../features/character/controller/helpers";

// function applyVectorMatrixXZ(
//   a: THREE.Vector3,
//   b: THREE.Vector3,
//   target: THREE.Vector3
// ): THREE.Vector3 {
//   return target.set(a.x * b.z + a.z * b.x, b.y, a.z * b.z + -a.x * b.x);
// }

// /**
//  * Finds an angle between two vectors
//  * @param {THREE.Vector3} v1
//  * @param {THREE.Vector3} v2
//  */
// export function getAngleBetweenVectors(
//   v1: THREE.Vector3,
//   v2: THREE.Vector3,
//   dotTreshold = 0.0005
// ): number {
//   let angle: number;
//   const dot = v1.dot(v2);

//   // If dot is close to 1, we'll round angle to zero
//   if (dot > 1 - dotTreshold) {
//     angle = 0;
//   } else {
//     // Dot too close to -1
//     if (dot < -1 + dotTreshold) {
//       angle = Math.PI;
//     } else {
//       // Get angle difference in radians
//       angle = Math.acos(dot);
//     }
//   }

//   return angle;
// }

// /**
//  * Finds an angle between two vectors with a sign relative to normal vector
//  */
// const UP = new Vector3(0, 1, 0);
// const cross = new Vector3();
// export function getSignedAngleBetweenVectors(
//   v1: THREE.Vector3,
//   v2: THREE.Vector3,
//   normal = UP,
//   dotTreshold = 0.0005
// ): number {
//   let angle = getAngleBetweenVectors(v1, v2, dotTreshold);

//   // Get vector pointing up or down
//   cross.crossVectors(v1, v2);
//   // Compare cross with normal to find out direction
//   if (normal.dot(cross) < 0) {
//     angle = -angle;
//   }

//   return angle;
// }

// const getLocalMovementDirection = ({ context, event }) => {
//   const positiveX = event.input.rightward ? -1 : 0;
//   const negativeX = event.input.leftward ? 1 : 0;
//   const positiveZ = event.input.forward ? 1 : 0;
//   const negativeZ = event.input.backward ? -1 : 0;

//   return context.movementInfo.localMovementDirection
//     .set(positiveX + negativeX, 0, positiveZ + negativeZ)
//     .normalize();
// };

// const updatePositionFromRigidBody = ({ context }) => {
//   if (!context.rapierRigidBodyRef.current) return;
//   const { x, y, z } = context.rapierRigidBodyRef.current.translation();
//   context.movementInfo.position.set(x, y, z);
// };

// const updateMovementSpring = ({ context, event }) => {
//   // Simulator
//   context.movementInfo.velocitySimulator.target.copy(
//     context.movementInfo.arcadeVelocityTarget
//   );
//   context.movementInfo.velocitySimulator.simulate(event.timeStep);

//   // Update values
//   context.movementInfo.velocity.copy(
//     context.movementInfo.velocitySimulator.position
//   );
// };

// const updateRotationSpring = ({ context, event }) => {
//   // Spring rotation
//   // Figure out angle between current and target orientation
//   const angle = getSignedAngleBetweenVectors(
//     context.movementInfo.orientation,
//     context.movementInfo.orientationTarget
//   );

//   // Simulator
//   context.movementInfo.rotationSimulator.target = angle;
//   context.movementInfo.rotationSimulator.simulate(event.timeStep * 1.74);
//   const rot = context.movementInfo.rotationSimulator.position;

//   // Updating values
//   context.movementInfo.orientation.applyAxisAngle(new Vector3(0, 1, 0), rot);
//   context.movementInfo.angularVelocity =
//     context.movementInfo.rotationSimulator.velocity;
// };

// const updateModelRotation = ({ context }) => {
//   const rotationQuaternion = new Quaternion();
//   const rotationMatrix = new Matrix4();
//   const zeroVec = new Vector3(0, 0, 0);
//   const upVec = new Vector3(0, 1, 0);
//   rotationQuaternion.setFromRotationMatrix(
//     rotationMatrix.lookAt(context.movementInfo.orientation, zeroVec, upVec)
//   );
//   context.mesh3DRef.current?.quaternion.copy(rotationQuaternion);
// };

// const setOrientation = (context, vec) => {
//   const lookVector = new Vector3().copy(vec).setY(0).normalize();
//   context.movementInfo.orientationTarget.copy(lookVector);
// };

// const getCameraRelativeMovementVector = ({ context, event }) => {
//   const flatViewVector = new Vector3();
//   const cameraRelativeMovementVector = new Vector3();
//   flatViewVector
//     .set(
//       context.movementInfo.viewVector.x,
//       0,
//       context.movementInfo.viewVector.z
//     )
//     .normalize();
//   return applyVectorMatrixXZ(
//     flatViewVector,
//     getLocalMovementDirection({ context, event }),
//     cameraRelativeMovementVector
//   );
// };

// const updateOrientationTarget = ({ context, event }) => {
//   const moveVector = getCameraRelativeMovementVector({ context, event });
//   const noInputDirection =
//     moveVector.x === 0 && moveVector.y === 0 && moveVector.z === 0;
//   if (noInputDirection) {
//     context.movementInfo.arcadeVelocityTarget.z = 0;
//     setOrientation(context, context.movementInfo.orientation);
//   } else {
//     context.movementInfo.arcadeVelocityTarget.z = 1;
//     setOrientation(context, moveVector);
//   }
// };

// const updateViewVector = ({ context, event }) => {
//   context.movementInfo.viewVector.subVectors(
//     context.movementInfo.position,
//     event.camera.position
//   );
// };

// const updateMovement = ({ context, event, updateContext }) => {
//   const newMovementInfo = { ...context.movementInfo };

//   updatePositionFromRigidBody({ context, event, newMovementInfo });
//   updateViewVector({ context, event, newMovementInfo });
//   updateOrientationTarget({ context, event, newMovementInfo });
//   updateMovementSpring({ context, event, newMovementInfo });
//   updateRotationSpring({ context, event, newMovementInfo });
//   updateModelRotation({ context, event, newMovementInfo });
//   updateContext({ movementInfo: newMovementInfo });

// };

export const physicsPostStep = ({ context, updateContext }) => {
  if (!context.rapierRigidBodyRef?.current) return;
  const velocity = context.rapierRigidBodyRef.current.linvel();

  const simulatedVelocity = new Vector3(velocity.x, velocity.y, velocity.z);
  const arcadeVelocity = simulatedVelocity.clone().multiplyScalar(context.movementInfo.moveSpeed);

  applyVectorMatrixXZ(
    context.movementInfo.orientation,
    arcadeVelocity,
    arcadeVelocity
  );

  const arcadeVelocityInfluence = new Vector3(1, 0, 1);
  const combinedVelocity = new Vector3();

  lerpVectors(
    simulatedVelocity,
    arcadeVelocity,
    arcadeVelocityInfluence,
    combinedVelocity
  );

  combinedVelocity.y = Math.min(
    Math.max(combinedVelocity.y, context.movementInfo.gravityLimit),
    40
  );

  context.rapierRigidBodyRef.current?.setLinvel(combinedVelocity, true);

  updateContext({
    movementInfo: {
      ...context.movementInfo,
      simulatedVelocity,
      arcadeVelocity,
      arcadeVelocityInfluence,
      combinedVelocity
    }
  });
};
  // export const physicsPostStep = ({ context }) => {
  //   if (!context.rapierRigidBodyRef?.current) return;
  //   const velocity = context.rapierRigidBodyRef.current.linvel();
  //   context.movementInfo.simulatedVelocity.set(velocity.x, velocity.y, velocity.z);

  //   // Take local velocity
  //   context.movementInfo.arcadeVelocity.copy(velocity).multiplyScalar(context.movementInfo.moveSpeed);

  //   // Turn local into global
  //   applyVectorMatrixXZ(
  //     context.movementInfo.orientation,
  //     context.movementInfo.arcadeVelocity,
  //     context.movementInfo.arcadeVelocity
  //   );


  //   context.movementInfo.arcadeVelocityInfluence.set(1, 0, 1);


  //   lerpVectors(
  //     context.movementInfo.simulatedVelocity,
  //     context.movementInfo.arcadeVelocity,
  //     context.movementInfo.arcadeVelocityInfluence,
  //     context.movementInfo.combinedVelocity
  //   );

  //   // Limit Gravity
  //   context.movementInfo.combinedVelocity.y = Math.min(
  //     Math.max(context.movementInfo.combinedVelocity.y, context.movementInfo.gravityLimit),
  //     40
  //   );
  //   // Apply velocity
  //   context.rapierRigidBodyRef.current?.setLinvel(context.movementInfo.combinedVelocity, true);
  // }
  // export default updateMovement;
