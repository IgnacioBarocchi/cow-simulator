import { Canvas } from "@react-three/offscreen";
import Experience from "./experience";
import WorkerFile from "./worker.jsx?worker";
import { config } from "./experience-config";
import { lazy } from "react";
// const Experience = lazy(() => import("./experience"));

const worker = new WorkerFile();

export default function WebGlApp() {
  return (
    <Canvas worker={worker} fallback={<Experience />} {...config.canvasProps} />
  );
}

// const worker = new Worker(new URL("./worker.jsx", import.meta.url), {
//   type: "module",
// });
