import ActionPanel from "./action-panel";
import { Box } from "@mono/ui";
import { Player } from "@mono/characters";
// import { InputControls } from "../character/controller/input-controls";
// import { LoadingScreen } from "../../../view/loading-screen";
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
        {/* <LoadingScreen /> */}
        <Player.Controls />
        <SceneSelector />
        <ActionPanel />
      </Box>
    </>
  );
};

export default UI;
