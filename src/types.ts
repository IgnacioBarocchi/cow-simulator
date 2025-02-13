import { RapierRigidBody } from "@react-three/rapier";
import { RefObject } from "react";
import { Event, Object3D } from "three";

export type ObjectRef = RefObject<Object3D<Event> | null>;
export type RigidBodyRef = RefObject<RapierRigidBody | null>;
