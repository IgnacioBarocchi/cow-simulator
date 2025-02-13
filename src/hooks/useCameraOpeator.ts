import { useThree } from "@react-three/fiber";
import { useMemo, useEffect } from "react";
import { Object3D, PerspectiveCamera, Vector2, Vector3 } from "three";
import usePointerLockControls from "./usePointerLockControls";

const cameraPhi = 30;
const cameraTheta = 30;
const min = 3.16;
const max = 10;
class CameraOperator {
  camera: PerspectiveCamera;
  target: Vector3;
  direction: Vector3;
  sensitivity: Vector2;
  radius: number;
  theta: number;
  phi: number;
  // actorRef;

  constructor({
    camera,
    sensitivityX = 0.16,
    sensitivityY = sensitivityX * 0.74,
    phi = 0,
    theta = 0,
    normalRadius = min,
  }: // actorRef,
  {
    camera: PerspectiveCamera;
    sensitivityX?: number;
    sensitivityY?: number;
    phi?: number;
    theta?: number;
    normalRadius?: number;
    // actorRef;
  }) {
    this.camera = camera;

    this.sensitivity = new Vector2(sensitivityX, sensitivityY);
    this.theta = theta;
    this.phi = phi;
    this.target = new Vector3();
    this.direction = new Vector3();
    this.radius = normalRadius;
    // this.actorRef = actorRef;
  }

  move(deltaX: number, deltaY: number) {
    this.theta -= deltaX * (this.sensitivity.x / 2);
    this.theta %= 360;
    this.phi += deltaY * (this.sensitivity.y / 2);
    this.phi = Math.min(74, Math.max(-28, this.phi));
  }

  update(target: Object3D) {
    target.getWorldPosition(this.target);
    this.target.y += 2.5;
    this.target.z += 1;

    this.updateCameraPosition();
    this.camera.updateMatrix();
    // this.camera.lookAt(this.target);
    this.camera.lookAt(
      this.target.addVectors(this.target, new Vector3(0, 0, 0))
    );
    this.direction.subVectors(this.target, this.camera.position).normalize();
  }

  private updateCameraPosition() {
    const theta = (this.theta * Math.PI) / 180;
    const phi = (this.phi * Math.PI) / 180;

    const x = this.target.x + this.radius * Math.sin(theta) * Math.cos(phi);
    const y = this.target.y + this.radius * Math.sin(phi);
    const z = this.target.z + this.radius * Math.cos(theta) * Math.cos(phi);
    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.position.z = z + min;
  }
}

export default function useCameraOperator() {
  const setPointer = () => {
    console.log("nothing for now");
  };
  const camera = useThree((s) => {
    const cam = s.camera;
    cam.fov = 45;
    cam.zoom = 1;
    cam.near = 1;
    cam.far = 1000;
    cam.updateProjectionMatrix();
    return cam;
  }) as PerspectiveCamera;

  const gl = useThree((s) => s.gl);

  usePointerLockControls(
    gl,
    (e) => cameraOperator.move(e.movementX, e.movementY),
    setPointer
  );

  const cameraOperator = useMemo(
    () =>
      new CameraOperator({
        camera,
        phi: cameraPhi,
        theta: cameraTheta,
        normalRadius: min, // Start at 100
      }),
    [camera]
  );

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // Adjust the zoom level based on the wheel delta
      const delta = -event.deltaY * 0.05; // Invert the direction and scale
      cameraOperator.radius = Math.min(
        Math.max(cameraOperator.radius + delta, min),
        max
      ); // Clamp between 5 and 200
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [cameraOperator]);

  return cameraOperator;
}
/*
import { useThree } from "@react-three/fiber";
import { useMemo, useEffect, useState, useRef, useCallback } from "react";
import { Object3D, PerspectiveCamera, Vector2, Vector3 } from "three";
import usePointerLockControls from "./usePointerLockControls";

const cameraPhi = 30;
const cameraTheta = 30;

export default function useCameraOperator() {
  const setPointer = () => {
    console.log("nothing for now");
  };

  const camera = useThree((s) => {
    const cam = s.camera as PerspectiveCamera;
    cam.fov = 45;
    cam.zoom = 1;
    cam.near = 1;
    cam.far = 1000;
    cam.updateProjectionMatrix();
    return cam;
  });

  const gl = useThree((s) => s.gl);

  // State for camera movement
  const [theta, setTheta] = useState(cameraTheta);
  const [phi, setPhi] = useState(cameraPhi);
  const [radius, setRadius] = useState(10);

  const target = useRef(new Vector3());
  const direction = useRef(new Vector3());
  const sensitivity = useRef(new Vector2(0.16, 0.16 * 0.74));

  // Function to handle movement
  const move = useCallback((deltaX: number, deltaY: number) => {
    setTheta(
      (prevTheta) => (prevTheta - deltaX * (sensitivity.current.x / 2)) % 360
    );
    setPhi((prevPhi) =>
      Math.min(
        74,
        Math.max(-28, prevPhi + deltaY * (sensitivity.current.y / 2))
      )
    );
  }, []);

  // Function to update the camera position
  const updateCameraPosition = useCallback(() => {
    const thetaRad = (theta * Math.PI) / 180;
    const phiRad = (phi * Math.PI) / 180;

    const x = target.current.x + radius * Math.sin(thetaRad) * Math.cos(phiRad);
    const y = target.current.y + radius * Math.sin(phiRad);
    const z = target.current.z + radius * Math.cos(thetaRad) * Math.cos(phiRad);

    camera.position.set(x, y, z + 15);
    camera.lookAt(target.current);
    direction.current.subVectors(target.current, camera.position).normalize();
    camera.updateMatrix();
  }, [theta, phi, radius, camera]);

  // Function to update the camera based on the target object
  const update = useCallback(
    (obj: Object3D) => {
      obj.getWorldPosition(target.current);
      target.current.y += 2.5;
      target.current.z += 1;
      updateCameraPosition();
    },
    [updateCameraPosition]
  );

  // Handle zooming via mouse wheel
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      setRadius((prevRadius) =>
        Math.min(Math.max(prevRadius - event.deltaY * 0.05, 5), 10)
      );
    };

    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Pointer lock controls
  usePointerLockControls(gl, (e) => move(e.movementX, e.movementY), setPointer);

  return { update };
}

*/
