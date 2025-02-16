import { ReactThreeFiber } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { RefObject } from "react";
import {
  Camera,
  Event,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
} from "three";

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
