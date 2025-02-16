import { Box, Button, Text } from "grommet";
import { FormNext, FormPrevious } from "grommet-icons";
import { atom, useAtom } from "jotai";
import styled from "styled-components";
const primary = "white";

const scenes = ["Corral", "Ordeñador", "Matadero"];
export const selectedSceneAtom = atom(0);

const Dot = styled(Box)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ active }) => (active ? primary : "#555")};
  margin: 0 5px;
  transition: background 0.3s;
`;

const SceneSelector = () => {
  const [selectedScene, setSelectedScene] = useAtom(selectedSceneAtom);

  const nextScene = () => {
    setSelectedScene((prev) => (prev + 1) % scenes.length);
  };

  const downScene = () => {
    setSelectedScene((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  return (
    <Box
      background="transparent"
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
      }}
    >
      <Box
        direction="row"
        align="center"
        justify="between"
        gap="medium"
        width="500px"
        margin={{ top: "medium" }}
      >
        <Button
          style={{ pointerEvents: "auto" }}
          icon={<FormPrevious color="primary" />}
          onClick={downScene}
        />
        <Text size="large" weight="bold" color="text">
          {scenes[selectedScene]}
        </Text>
        <Button
          style={{ pointerEvents: "auto" }}
          icon={<FormNext color="primary" />}
          onClick={nextScene}
        />
      </Box>
      <Box
        direction="row"
        margin={{ top: "small" }}
        justify="center"
        align="center"
        width="500px"
      >
        {scenes.map((_, index) => (
          <Dot key={index} active={index === selectedScene} />
        ))}
      </Box>
    </Box>
  );
};

export default SceneSelector;
