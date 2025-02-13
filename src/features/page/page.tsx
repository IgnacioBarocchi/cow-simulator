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

export const PageOverlay = () => {
  const { state } = usePlayerMachine();
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
{
  /* <div
style={{
  position: "absolute",
  top: 0,
  right: "5px",
  color: "white",
  fontSize: "50",
  background: "red",
  width: "100px",
  height: "50px",
}}
>
{state?.value}
</div> */
}
