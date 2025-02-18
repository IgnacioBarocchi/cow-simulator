import { Canvas } from "@react-three/offscreen";
import { config } from "./experience-config";
import { lazy } from "react";
const Experience = lazy(() => import("./experience"));

const worker = new Worker(new URL("./worker.jsx", import.meta.url), {
  type: "module",
});

export default function WebGlApp() {
  return (
    <Canvas worker={worker} fallback={<Experience />} {...config.canvasProps} />
  );
}
