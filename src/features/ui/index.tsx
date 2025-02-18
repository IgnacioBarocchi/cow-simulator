import { FC, ReactNode } from "react";

import ActionPanel from "./action-panel";
import { Grommet } from "grommet";
import { InputControls } from "../character/controller/input";
import { LoadingScreen } from "../page/loading-screen";
import SceneSelector from "../scene-selector";

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

const UI = () => {
  return (
    <>
      <LoadingScreen />
      <InputControls />
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

export default UI;
