import { Card, CardBody, Box } from "grommet";

export const MicroForm = ({ buttons, Inputs }) => {
  return (
    <Card
      pad="medium"
      // width="medium"
      background="background-contrast"
      border={{ style: "solid" }}
    >
      <CardBody>
        <Box direction="column" gap="medium">
          <Box direction="row" gap="medium" align="center">
            {buttons.map((Component) => Component())}
          </Box>
          <Inputs />
        </Box>
      </CardBody>
    </Card>
  );
};
