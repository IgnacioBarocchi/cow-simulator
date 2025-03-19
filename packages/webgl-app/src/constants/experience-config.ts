import { CameraOptions } from "../types";
import { CanvasProps } from "@react-three/fiber";
import {
    PhysicsProps
} from "@react-three/rapier";
import { degToRad } from "three/src/math/MathUtils.js";

const isDev = window.location.pathname.endsWith("/dev");

const camera: CameraOptions = {
    fov: 45,
    near: 0.001,
    far: 200,
    position: [-2, 4, 10],
};

const canvasProps = {
    shadows: true,
    camera,
} as Omit<CanvasProps, "fallback">;

const physicProps = {
    timeStep: "vary",
    gravity: [0, -9.8, 0],
} as Omit<PhysicsProps, "debug">;

const orbitControlsProps = {
    enableDamping: false,
    makeDefault: false,
    minDistance: 3.5,
    maxDistance: 10,
    enablePan: false,
    minPolarAngle: degToRad(30),
    maxPolarAngle: degToRad(90),
};

export const config = {
    isDev,
    camera,
    canvasProps,
    physicProps,
    orbitControlsProps
}