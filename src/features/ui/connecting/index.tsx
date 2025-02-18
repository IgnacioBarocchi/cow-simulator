import { Box, Text } from "grommet";

const Connecting = ({ party, background }) => {
  return (
    <Box background={background} full pad="small">
      <Text color="white">[{party}]: Conectando a Intervención V</Text>
    </Box>
  );
};

export default Connecting;
