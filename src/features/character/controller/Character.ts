import {
  Camera,
  MathUtils,
  Matrix4,
  Quaternion,
  Vector3,
  Vector3Tuple,
} from "three";
import { Input, ObjectRef, RigidBodyRef } from "../../../types";
import {
  applyVectorMatrixXZ,
  getSignedAngleBetweenVectors,
  lerpVectors,
} from "./helpers";

import { RelativeSpringSimulator } from "../../../lib/physics/RelativeSpringSimulator";
import { VectorSpringSimulator } from "../../../lib/physics/VectorSpringSimulator";
import { WorldApi } from "@react-three/rapier";

// import { input } from "./input-controls";

// import { Ray } from "@dimforge/rapier3d-compat";


const runSpeed = 4;
const walkSpeed = 1;
const jumpSpeed = 1;

export class Character {
  velocity = new Vector3();
  arcadeVelocityInfluence = new Vector3(1, 0, 1);
  arcadeVelocityTarget = new Vector3();
  velocitySimulator: VectorSpringSimulator;
  rotationSimulator: RelativeSpringSimulator;
  defaultVelocitySimulatorMass = 510;
  defaultVelocitySimulatorDamping = 0.85;
  defaultRotationSimulatorMass = 100;
  defaultRotationSimulatorDamping = 0.55;
  grounded = false;
  // footShape = new Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0 });
  gravityLimit = -26;
  moveSpeed = 0;
  angularVelocity = 0;
  orientation = new Vector3(0, 0, 1);
  orientationTarget = new Vector3(0, 0, 1);
  viewVector = new Vector3();
  readonly position = new Vector3();

  private rigidbody: RigidBodyRef;
  // private model: ObjectRef;
  private camera: Camera;
  input

  constructor(props: {
    orientation?: Vector3Tuple;
    rigidbody: RigidBodyRef;
    model: ObjectRef;
    camera: Camera;
    input: Input
  }) {
    this.rigidbody = props.rigidbody;
    this.camera = props.camera;
    // this.model = props.model;
    this.input = props.input
    const orientation = props.orientation ?? [0, 0, 1];
    this.orientation = new Vector3(
      orientation[0],
      orientation[1],
      orientation[2]
    );
    this.orientationTarget = new Vector3(
      orientation[0],
      orientation[1],
      orientation[2]
    );

    this.velocitySimulator = new VectorSpringSimulator(
      60,
      this.defaultVelocitySimulatorMass,
      this.defaultVelocitySimulatorDamping
    );
    this.rotationSimulator = new RelativeSpringSimulator(
      60,
      this.defaultRotationSimulatorMass,
      this.defaultRotationSimulatorDamping
    );
  }

  setArcadeVelocityInfluence(x: number, y: number = x, z: number = x): void {
    this.arcadeVelocityInfluence.set(x, y, z);
  }

  setViewVector(vector: THREE.Vector3): void {
    this.viewVector.copy(vector).normalize();
  }

  lookVector = new Vector3();
  setOrientation(vector: THREE.Vector3): void {
    this.lookVector.copy(vector).setY(0).normalize();
    this.orientationTarget.copy(this.lookVector);
  }

  updateViewVector() {
    this.viewVector.subVectors(this.position, this.camera.position);
  }

  update(timeStep: number, input) {
    this.input = input;
    this.updatePositionFromRigidbody();
    this.updateViewVector();
    this.updateOrientationTarget();
    this.updateAirBro();
    this.updateMoveSpeed();
    this.updateMovementSpring(timeStep);
    this.updateRotationSpring(timeStep);
    this.updateModelRotation();
  }

  private updatePositionFromRigidbody() {
    if (!this.rigidbody.current) return;
    const { x, y, z } = this.rigidbody.current.translation();
    this.position.set(x, y, z);
  }

  private updateMoveSpeed() {
    let targetSpeed = walkSpeed;

    if (this.jumping || this.falling) {
      targetSpeed = this.moveSpeed;
    } else if (this.input.SPRINT) {
      targetSpeed = runSpeed;
    }

    this.moveSpeed = MathUtils.lerp(this.moveSpeed, targetSpeed, 0.116);
  }

  falling = false;
  preJump = false;
  shouldJump = false;
  jumping = 0;
  updateAirBro() {
    if (!this.rigidbody.current) return;

    const currentY = this.rigidbody.current.linvel().y;
    const isFalling = currentY < -3.16;

    if (this.jumping === 2 && this.falling && !isFalling) {
      this.jumping = 0;
    }

    if (this.falling !== isFalling) {
      console.log(isFalling ? "Falling" : "Landed");
    }
    this.falling = isFalling;

    if (this.input.JUMP && !this.jumping && !this.falling) {
      this.preJump = true;
    }

    if (!this.jumping && !this.falling && this.preJump && !this.input.JUMP) {
      this.shouldJump = true;
    }
  }

  updateMovementSpring(timeStep: number) {
    // Simulator
    this.velocitySimulator.target.copy(this.arcadeVelocityTarget);
    this.velocitySimulator.simulate(timeStep);

    // Update values
    this.velocity.copy(this.velocitySimulator.position);
  }

  UP = new Vector3(0, 1, 0);
  updateRotationSpring(timeStep: number): void {
    // Spring rotation
    // Figure out angle between current and target orientation
    const angle = getSignedAngleBetweenVectors(
      this.orientation,
      this.orientationTarget
    );

    // Simulator
    this.rotationSimulator.target = angle;
    this.rotationSimulator.simulate(timeStep * 1.74);
    const rot = this.rotationSimulator.position;

    // Updating values
    this.orientation.applyAxisAngle(this.UP, rot);
    this.angularVelocity = this.rotationSimulator.velocity;
  }

  localMovementDirection = new Vector3();
  getLocalMovementDirection() {
    const positiveX = this.input.RIGHT ? -1 : 0;
    const negativeX = this.input.LEFT ? 1 : 0;
    const positiveZ = this.input.FORWARD ? 1 : 0;
    const negativeZ = this.input.BACKWARD ? -1 : 0;
    return this.localMovementDirection
      .set(positiveX + negativeX, 0, positiveZ + negativeZ)
      .normalize();
  }

  flatViewVector = new Vector3();
  cameraRelativeMovementVector = new Vector3();
  getCameraRelativeMovementVector() {
    this.flatViewVector
      .set(this.viewVector.x, 0, this.viewVector.z)
      .normalize();
    return applyVectorMatrixXZ(
      this.flatViewVector,
      this.getLocalMovementDirection(),
      this.cameraRelativeMovementVector
    );
  }

  updateOrientationTarget() {
    const moveVector = this.getCameraRelativeMovementVector();
    const noInputDirection =
      moveVector.x === 0 && moveVector.y === 0 && moveVector.z === 0;
    if (noInputDirection) {
      this.arcadeVelocityTarget.z = 0;
      this.setOrientation(this.orientation);
    } else {
      this.arcadeVelocityTarget.z = 1;
      this.setOrientation(moveVector);
    }
  }

  private rotationQuaternion = new Quaternion();
  private rotationMatrix = new Matrix4();
  private zeroVec = new Vector3(0, 0, 0);
  private upVec = new Vector3(0, 1, 0);
  updateModelRotation() {
    this.rotationQuaternion.setFromRotationMatrix(
      this.rotationMatrix.lookAt(this.orientation, this.zeroVec, this.upVec)
    );
    this.rigidbody.current?.setRotation(this.rotationQuaternion, true);
    // this.model.current?.quaternion.copy(this.rotationQuaternion);
  }

  private simulatedVelocity = new Vector3();
  readonly arcadeVelocity = new Vector3();
  readonly combinedVelocity = new Vector3();

  physicsPostStep(worldApi: WorldApi) {
    if (!this.rigidbody.current) return;

    const velocity = this.rigidbody.current.linvel();
    this.simulatedVelocity.set(velocity.x, velocity.y, velocity.z);

    // Take local velocity
    this.arcadeVelocity.copy(this.velocity).multiplyScalar(this.moveSpeed);

    // Turn local into global
    applyVectorMatrixXZ(
      this.orientation,
      this.arcadeVelocity,
      this.arcadeVelocity
    );

    if (this.jumping === 1) {
      this.simulatedVelocity.y += jumpSpeed;
      this.jumping = 2;
    }
    if (this.shouldJump) {
      this.shouldJump = false;
      this.preJump = false;
      this.jumping = 1;
    }

    if (this.jumping || this.falling) {
      this.arcadeVelocityInfluence.set(0.116, 0, 0.116);
    } else {
      this.arcadeVelocityInfluence.set(1, 0, 1);
    }

    lerpVectors(
      this.simulatedVelocity,
      this.arcadeVelocity,
      this.arcadeVelocityInfluence,
      this.combinedVelocity
    );

    // Limit Gravity
    this.combinedVelocity.y = Math.min(
      Math.max(this.combinedVelocity.y, this.gravityLimit),
      40
    );
    // Apply velocity
    this.rigidbody.current?.setLinvel(this.combinedVelocity, true);
  }
}
