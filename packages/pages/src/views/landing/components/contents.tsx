import { Box, Button, Heading, Text } from "@mono/ui";

import Info from "./info";

const Contents = ({ scrollToSimulation }) => {
  return (
    <>
      <Heading level={1} size="large" id="page-heading" color="light-1">
        Simulador de Vaca
      </Heading>
      <Text size="large" color="light-4" margin={{ bottom: "medium" }}>
        Una experiencia honesta sobre la realidad de las vacas en la industria
        lechera.
      </Text>
      <Box direction="row" gap="medium">
        <Info />
        <Button label="Simular" onClick={scrollToSimulation} primary />
      </Box>
    </>
  );
};

export default Contents;
