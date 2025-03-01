import {
  Camera,
  Event,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
} from "three";

import { RapierRigidBody } from "@react-three/rapier";
import { ReactThreeFiber } from "@react-three/fiber";
import { RefObject } from "react";

export type ObjectRef = RefObject<Object3D<Event> | null>;
export type RigidBodyRef = RefObject<RapierRigidBody | null>;
export type CameraOptions = (
  | Camera
  | Partial<
    ReactThreeFiber.Object3DNode<Camera, typeof Camera> &
    ReactThreeFiber.Object3DNode<
      PerspectiveCamera,
      typeof PerspectiveCamera
    > &
    ReactThreeFiber.Object3DNode<
      OrthographicCamera,
      typeof OrthographicCamera
    >
  >
) & {
  manual?: boolean;
};

export enum Controls {
  FORWARD = "FORWARD",
  BACKWARD = "BACKWARD",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  JUMP = "JUMP",
  SPRINT = "SPRINT",
  ATTACK1 = "ATTACK1",
  ATTACK2 = "ATTACK2",
  EAT = "EAT",
}

type ControlsState<T extends string = string> = { [K in T]: boolean };
export type Input = ControlsState<Controls>;