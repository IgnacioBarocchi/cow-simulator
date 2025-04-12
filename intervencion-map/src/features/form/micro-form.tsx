import { Box } from "@mono/ui";

export const MicroForm = ({ buttons, Inputs }) => {
  return (
    <Box direction="column" gap="medium">
      <Box direction="row" gap="medium" align="center">
        {buttons.map((Component) => (
          <Component key={Math.random() + ""} />
        ))}
      </Box>
      <Inputs />
    </Box>
  );
};
