import { Suspense, useEffect } from "react";
import CowPen from "./scenarios/CowPen";

export default function App() {
  useEffect(() => {
    const handlePermission = () => {
      const permissionPromise = document.documentElement.requestFullscreen();
      if (permissionPromise) {
        permissionPromise
          .then(() => {})
          .catch((error) => {
            console.error("Permiso denegado para reproducir sonidos:", error);
          });
      }
    };
    document.documentElement.addEventListener("click", handlePermission);
    return () => {
      document.documentElement.removeEventListener("click", handlePermission);
    };
  }, []);

  return (
    <>
      {/* <div>{`current scenario {{current scenario value}}`}</div> */}
      <Suspense
        fallback={
          <div className="fallback-container">
            <div className="loading-message">Loading...</div>
            <div className="spinner"></div>
          </div>
        }
      >
        <CowPen />
      </Suspense>
    </>
  );
}
