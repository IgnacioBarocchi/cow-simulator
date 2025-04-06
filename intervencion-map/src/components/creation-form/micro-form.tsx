import { Box } from "grommet";

export const MicroForm = ({ buttons, Inputs }) => {
  return (
    <Box direction="column" gap="medium">
      <Box direction="row" gap="medium" align="center">
        {buttons.map((Component) => Component())}
      </Box>
      <Inputs />
    </Box>
  );
};
