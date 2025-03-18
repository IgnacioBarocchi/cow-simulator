import {
  Box,
  Button,
  Carousel,
  Heading,
  Image,
  MarkdownText,
  Stack,
  useGistMDFile,
} from "@mono/ui";

import { Endpoints } from "@mono/context";
import { fontStack } from "@mono/ui/src/components/ui-provider/ui-config";

const IntervencionV = () => {
  const text = useGistMDFile(Endpoints.intervencionVText);
  return (
    <Box pad="medium" gap="small" style={{ fontFamily: fontStack }}>
      <Stack anchor="center">
        <Carousel
          height="medium"
          controls={false}
          play={2000}
          style={{ filter: "grayscale(1) blur(5px)" }}
        >
          <Image fit="cover" src="images/intervencionv1.jpg" />
          <Image fit="cover" src="images/intervencionv2.jpg" />
          <Image fit="cover" src="images/intervencionv3.jpg" />
        </Carousel>
        <Box align="center">
          <Heading level={1}>Intervención V </Heading>
          <Button
            as="a"
            label="@intervencion_v"
            href="https://www.instagram.com/intervencion_v"
            target="_blank"
            style={{
              background: "black",
              color: "#DADADA",
            }}
          />
        </Box>
      </Stack>
      <MarkdownText text={text} />
    </Box>
  );
};

export default IntervencionV;
