import { Box, Button, Heading, Layer, Text } from "grommet";

import { Close } from "grommet-icons";

const ViewMoreLayer = ({ setShowFull, info }) => {
  return (
    <Layer
      onEsc={() => setShowFull(false)}
      onClickOutside={() => setShowFull(false)}
      full
      margin="large"
      style={{ overflow: "auto" }}
      background="background"
      animation="fadeIn"
    >
      <Box pad="medium" gap="small">
        <Box direction="row" align="center" justify="between">
          <Heading level={3} margin="none">
            {info.title}
          </Heading>
          <Button icon={<Close />} onClick={() => setShowFull(false)} plain />
        </Box>
        {info.body.map((body, index) => (
          <Text key={index}>{body}</Text>
        ))}
      </Box>
    </Layer>
  );
};

export default ViewMoreLayer;
