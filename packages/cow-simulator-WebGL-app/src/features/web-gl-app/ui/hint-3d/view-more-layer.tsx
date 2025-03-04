import { Box, Button, Heading, InfoLayer, Text } from "@mono/ui";

import { Close } from "grommet-icons";

const ViewMoreLayer = ({ setShowFull, info }) => {
  return (
    <InfoLayer onClickOutside={() => setShowFull(false)}>
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
    </InfoLayer>
  );
};

export default ViewMoreLayer;
