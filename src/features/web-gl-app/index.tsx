import { Canvas } from "@react-three/fiber";
import { Canvas as EnhancedCanvas } from "@react-three/offscreen";
import WorkerFile from "./worker.jsx?worker";
import { config } from "./experience-config";
import { lazy } from "react";
const Experience = lazy(() => import("./experience"));

const worker = new WorkerFile();

const enableWebWorkersExperiment = window.location.pathname.endsWith("/ww");

export default function WebGlApp() {
  if (enableWebWorkersExperiment) {
    return (
      <EnhancedCanvas
        worker={worker}
        fallback={<Experience />}
        {...config.canvasProps}
      />
    );
  }

  return (
    <Canvas {...config.canvasProps}>
      <Experience />
    </Canvas>
  );
}

// const worker = new Worker(new URL("./worker.jsx", import.meta.url), {
//   type: "module",
// });
