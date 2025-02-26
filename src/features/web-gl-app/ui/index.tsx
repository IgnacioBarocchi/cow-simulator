import ActionPanel from "./action-panel";
import { Box } from "grommet";
import { InputControls } from "../character/controller/input-controls";
import { LoadingScreen } from "../../../view/loading-screen";
import SceneSelector from "../scene-selector";

export const primary = "white";

const UI = () => {
  return (
    <>
      <Box
        // theme={darkTheme}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          touchAction: "none",
          userSelect: "none",
        }}
        // full
        onContextMenu={(e) => e.preventDefault()}
      >
        <LoadingScreen />
        <InputControls />
        <SceneSelector />
        <ActionPanel />
      </Box>
    </>
  );
};

export default UI;
