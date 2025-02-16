import { useAtom } from "jotai";
import usePlayerMachine from "../../hooks/usePlayerMachine";
import { cowLoadedAtom } from "../../store/store";
import { Collapsible, Text, Box } from "grommet";
import Loading from "./loading";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 999;
  pointer-events: none;
`;

export const LoadingScreen = () => {
  const [gameLoaded] = useAtom(cowLoadedAtom);

  if (gameLoaded) {
    return null;
  }

  return (
    <Overlay>
      <div
        style={{
          position: "relative",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <Loading />
      </div>
    </Overlay>
  );
};
