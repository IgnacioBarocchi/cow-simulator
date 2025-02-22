import { Box, Button, Heading, Text } from "grommet";

import Donate from "./donate";
import Info from "./info";
import { Ticket } from "grommet-icons";
import landingImage from "/images/landing-image.jpg";

export default function LandingPage({ scrollToSimulation }) {
  return (
    <Box fill style={{ position: "relative", overflow: "hidden" }}>
      {/* Blurred Background Image */}
      <Box
        fill
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `url(${landingImage}) center/cover no-repeat`,
          filter: "blur(10px)", // 👈 Blurs only the background image
          zIndex: -2, // 👈 Pushed behind everything
        }}
      />

      {/* Gradient Overlay */}
      <Box
        fill
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(255,255,255,0) 50%, rgba(0,0,0,1) 90%)",
          zIndex: -1, // 👈 Keeps it behind the content but above the image
        }}
      />

      {/* Content */}
      <Box height="100vh" align="center" pad="medium">
        <Heading level={1} size="large" id="page-heading">
          Simulador de Vaca
        </Heading>
        <Text size="large" color="dark-6" margin={{ bottom: "medium" }}>
          Una experiencia honesta sobre la realidad de las vacas en la industria
          lechera.
        </Text>
        <Box direction="row" gap="medium">
          <Info />
          <Button
            label="Empezar simulación"
            onClick={scrollToSimulation}
            primary
          />
        </Box>
      </Box>
      <Box
        margin={{ bottom: "medium", right: "medium" }}
        style={{ position: "absolute", bottom: "0", right: "0" }}
      >
        <Donate />
      </Box>
    </Box>
  );
}
