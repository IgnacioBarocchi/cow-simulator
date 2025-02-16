import { Box, Collapsible, Text } from "grommet";
import { useAtom } from "jotai";
import styled from "styled-components";
import { cowLoadedAtom } from "../../store/store";
import Loading from "./loading";

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

export const PageOverlayNoseUsa = () => {
  const [gameLoaded] = useAtom(cowLoadedAtom);

  return (
    <Overlay>
      {!gameLoaded && <Loading />}
      <Box align="start">
        <Collapsible open={!gameLoaded} direction="horizontal">
          <Box
            background="light-2"
            round="medium"
            pad="medium"
            align="center"
            justify="center"
          >
            <Text>This is a box inside a Collapsible component</Text>
          </Box>
        </Collapsible>
      </Box>
    </Overlay>
  );
};
