import ActionPanel from "./action-panel";
import { Grommet } from "grommet";
import { InputControls } from "../character/controller/input-controls";
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
      <Grommet
        theme={darkTheme}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
        full
      >
        <LoadingScreen />
        <InputControls />
        <SceneSelector />
        <ActionPanel />
      </Grommet>
    </>
  );
};

export default UI;
