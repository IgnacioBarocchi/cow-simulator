import { Grommet } from "grommet";
import { FC, ReactNode } from "react";
import { InputControls } from "../features/character/controller/input";
import { LoadingScreen } from "../features/page/loading-screen";
import SceneSelector from "../features/scene-selector";
import ActionPanel from "../features/ui/action-panel";

export const primary = "white";
const darkTheme = {
  global: {
    colors: {
      background: "transparent",
      text: "#f5f5f5",
      primary,
    },
  },
};

const TopElements = () => {
  return (
    <>
      <LoadingScreen />
      <InputControls />
    </>
  );
};

const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <TopElements />
      {children}
      <Grommet
        theme={darkTheme}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        full
      >
        <SceneSelector />
        <ActionPanel />
      </Grommet>
    </>
  );
};

export default UIProvider;
