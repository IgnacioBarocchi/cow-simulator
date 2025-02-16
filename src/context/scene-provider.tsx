import { OrbitControls } from "@react-three/drei";
import { Canvas, CanvasProps } from "@react-three/fiber";
import {
  CuboidCollider,
  Physics,
  PhysicsProps,
  RigidBody,
} from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { FC, ReactNode } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
import Loading from "../features/page/loading";
import { CameraOptions } from "../types";

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
  fallback: <Loading />,
} as CanvasProps;

const physicProps = {
  timeStep: "vary",
  debug: isDev,
  gravity: [0, -9.8, 0],
} as PhysicsProps;

const orbitControlsProps = {
  enableDamping: false,
  makeDefault: true,
  minDistance: 3.5,
  maxDistance: 10,
  enablePan: false,
  minPolarAngle: degToRad(30),
  maxPolarAngle: degToRad(90),
};

const GroundCollider = () => {
  return (
    <RigidBody type={"fixed"} colliders={false}>
      <CuboidCollider friction={2} args={[5, 0, 5]} position={[0, 0, 0]} />
    </RigidBody>
  );
};

const SceneProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Canvas {...canvasProps}>
      {isDev && <Perf />}
      <OrbitControls {...orbitControlsProps} />
      <Physics {...physicProps}>
        <GroundCollider />
        {children}
      </Physics>
    </Canvas>
  );
};

export default SceneProvider;
