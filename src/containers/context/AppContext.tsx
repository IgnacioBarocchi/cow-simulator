import { FC, ReactNode, createContext, useEffect, useState } from "react";

const AppContext = createContext({
  USE_FULL_SCREEN: false,
  MONITOR_PERFORMANCE: false,
  USE_ORBIT_CONTROLS: false,
  USE_SCENE_LIGHTS: false,
});

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [appConfig, setAppConfig] = useState({
    USE_FULL_SCREEN: false,
    MONITOR_PERFORMANCE: false,
    USE_ORBIT_CONTROLS: false,
    USE_SCENE_LIGHTS: false,
  });

  useEffect(() => {
    const { DEV, PROD } = import.meta.env;

    const MOCK_USE_FULL_SCREEN =
      typeof import.meta.env.VITE_MOCK_USE_FULL_SCREEN === "undefined"
        ? false
        : import.meta.env.VITE_MOCK_USE_FULL_SCREEN;
    const MOCK_MONITOR_PERFORMANCE =
      typeof import.meta.env.VITE_MOCK_MONITOR_PERFORMANCE === "undefined"
        ? true
        : import.meta.env.VITE_MOCK_MONITOR_PERFORMANCE;
    const MOCK_USE_ORBIT_CONTROLS =
      typeof import.meta.env.VITE_MOCK_USE_ORBIT_CONTROLS === "undefined"
        ? false
        : import.meta.env.VITE_MOCK_USE_ORBIT_CONTROLS;
    const MOCK_USE_SCENE_LIGHTS =
      typeof import.meta.env.VITE_MOCK_USE_SCENE_LIGHTS === "undefined"
        ? false
        : import.meta.env.VITE_MOCK_USE_SCENE_LIGHTS;

    const USE_FULL_SCREEN = PROD || (DEV && MOCK_USE_FULL_SCREEN);

    const MONITOR_PERFORMANCE = PROD || (DEV && MOCK_MONITOR_PERFORMANCE);

    const USE_ORBIT_CONTROLS = !PROD || (DEV && MOCK_USE_ORBIT_CONTROLS);

    const USE_SCENE_LIGHTS = PROD || (DEV && MOCK_USE_SCENE_LIGHTS);

    setAppConfig({
      USE_FULL_SCREEN,
      MONITOR_PERFORMANCE,
      USE_ORBIT_CONTROLS,
      USE_SCENE_LIGHTS,
    });
  }, []);

  return (
    <AppContext.Provider value={appConfig}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };