import { FC, ReactNode, createContext } from "react";
const { DEV, PROD } = import.meta.env;

const config = {
  USE_FULL_SCREEN: PROD,
  //|| (DEV && MOCK_USE_FULL_SCREEN);
  MONITOR_PERFORMANCE: DEV,
  //|| (DEV && MOCK_MONITOR_PERFORMANCE);
  USE_ORBIT_CONTROLS: !PROD,
  //|| (DEV && MOCK_USE_ORBIT_CONTROLS);
  USE_SCENE_LIGHTS: PROD,
  //|| (DEV && MOCK_USE_SCENE_LIGHTS);
  DEBUG_PHYSICS: DEV,
};

const AppContext = createContext(config);

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <AppContext.Provider value={config}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
