import { Canvas } from '@react-three/fiber';
import { Canvas as EnhancedCanvas } from '@react-three/offscreen';
import WorkerFile from './worker.jsx?worker';
import { config } from '../../constants/experience-config';
import { lazy } from 'react';

const Experience = lazy(() => import('./experience'));
const worker = new WorkerFile();
const enableWebWorkersExperiment = window.location.pathname.endsWith('/ww');

export default function WebGlApp() {
  if (enableWebWorkersExperiment) {
    return (
      <EnhancedCanvas
        worker={worker}
        fallback={<Experience />}
        {...config.canvasProps}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    );
  }

  return (
    <Canvas
      {...config.canvasProps}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <Experience />
    </Canvas>
  );
}
