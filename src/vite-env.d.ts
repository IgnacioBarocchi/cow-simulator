/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MOCK_USE_FULL_SCREEN: boolean;
  readonly VITE_MOCK_MONITOR_PERFORMANCE: boolean;
  readonly VITE_MOCK_USE_ORBIT_CONTROLS: boolean;
  readonly VITE_MOCK_USE_SCENE_LIGHTS: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
