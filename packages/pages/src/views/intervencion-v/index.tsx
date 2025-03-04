import {
  Box,
  Button,
  Carousel,
  Heading,
  Image,
  MarkdownText,
  Stack,
} from "@mono/ui";

import { Endpoints } from "@mono/shared";

const IntervencionV = () => {
  return (
    <Box pad="medium" gap="small">
      <Stack anchor="center">
        <Carousel height="medium" controls={false} play={2000}>
          <Image
            fit="cover"
            src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"
          />
          <Image fit="cover" src="//v2.grommet.io/assets/IMG_4245.jpg" />
          <Image fit="cover" src="//v2.grommet.io/assets/IMG_4210.jpg" />
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
      <MarkdownText gistEndpoint={Endpoints.intervencionVText} />
    </Box>
  );
};

export default IntervencionV;
