import { Box, Button, Text } from "grommet";
import { FormNext, FormPrevious } from "grommet-icons";
import { atom, useAtom, useAtomValue } from "jotai";

import { Vector3 } from "three";
import { block } from "million/react";
import { playerContextAtom } from "../../../store/store";
import styled from "styled-components";
import { useCallback } from "react";

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

// Memoized Dot component to prevent re-renders
const MemoizedDot = block(({ active }) => <Dot active={active} />);

const SceneSelector = block(() => {
  const selectedScene = useAtomValue(selectedSceneAtom);
  const [, setSelectedScene] = useAtom(selectedSceneAtom);
  const { rapierRigidBodyRef, controller } = useAtomValue(playerContextAtom);

  const setRigidBody = useCallback(
    (next) => {
      if (next !== 1) return;

      if (!rapierRigidBodyRef?.current) return;

      controller.rigidbody.current.setTranslation({ x: 0, y: 0, z: 0 }, true);
      controller.setOrientation(new Vector3(0, 0, -1));
      controller.orientationTarget.set(0, 0, -1);
      controller.rigidbody.current?.wakeUp();
    },
    [setSelectedScene, rapierRigidBodyRef]
  );

  const nextScene = () => {
    setSelectedScene((prev) => {
      const next = (prev + 1) % scenes.length;
      setRigidBody(next);
      return next;
    });
  };

  const prevScene = () => {
    setSelectedScene((prev) => {
      const next = (prev - 1 + scenes.length) % scenes.length;
      setRigidBody(next);
      return next;
    });
  };

  return (
    <Box
      background="transparent"
      style={{
        position: /*"absolute"*/ "relative",
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
          icon={<FormPrevious color="white" />}
          onClick={prevScene}
        />
        <Text size="large" weight="bold" color="white">
          {scenes[selectedScene]}
        </Text>
        <Button
          style={{ pointerEvents: "auto" }}
          icon={<FormNext color="white" />}
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
          <MemoizedDot key={index} active={index === selectedScene} />
        ))}
      </Box>
    </Box>
  );
});

export default SceneSelector;
