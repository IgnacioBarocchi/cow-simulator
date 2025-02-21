import Loading from "./loading";
import { cowLoadedAtom } from "../../store/store";
import styled from "styled-components";
import { useAtom } from "jotai";

const Overlay = styled.div`
  position: relative;
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
