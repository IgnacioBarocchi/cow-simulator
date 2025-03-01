import { useEffect } from "react";
import { WebGLRenderer } from "three";

export default function usePointerLockControls(
  gl: WebGLRenderer,
  handleMove: (e: PointerEvent) => void,
  callback?: (locked: boolean) => void // Callback for lock state changes
) {
  useEffect(() => {
    function handleClick() {
      if (document.pointerLockElement !== gl.domElement) {
        gl.domElement.requestPointerLock?.();
      }
    }

    function handleLockChange() {
      const isLocked = document.pointerLockElement === gl.domElement;

      if (document.pointerLockElement) {
        gl.domElement.addEventListener("pointermove", handleMove);
      } else {
        gl.domElement.removeEventListener("pointermove", handleMove);
      }

      if (callback) {
        callback(isLocked);
      }
    }

    // Press "E" to exit pointer lock
    function handleKeyPress(event: KeyboardEvent) {
      if (
        (event.key === "e" || event.key === "E") &&
        document.pointerLockElement === gl.domElement
      ) {
        document.exitPointerLock();
      }
    }

    gl.domElement.addEventListener("click", handleClick);
    document.addEventListener("pointerlockchange", handleLockChange);
    document.addEventListener("keydown", handleKeyPress); // Listen for "E" key

    return () => {
      gl.domElement.removeEventListener("click", handleClick);
      gl.domElement.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerlockchange", handleLockChange);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [gl, handleMove]);
}
