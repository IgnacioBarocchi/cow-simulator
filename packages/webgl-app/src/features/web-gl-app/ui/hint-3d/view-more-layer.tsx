import { Box, ControlledInfoLayer, Heading, Text } from "@mono/ui";

const ViewMoreLayer = ({ setShowFull, info }) => {
  return (
    <ControlledInfoLayer onClose={() => setShowFull(false)}>
      <Box pad="medium" gap="small">
        <Box direction="row" align="center" justify="between">
          <Heading level={3} margin="none">
            {info.title}
          </Heading>
        </Box>
        {info.body.map((body, index) => (
          <Text key={index}>{body}</Text>
        ))}
      </Box>
    </ControlledInfoLayer>
  );
};

export default ViewMoreLayer;
