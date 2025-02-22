import { Box, Button, Heading, Layer, Text } from "grommet";

import { useDevice } from "use-device-react";
import { useState } from "react";

export default function LandingPage({ scrollToSimulation }) {
  const [showModal, setShowModal] = useState(null);
  const { isDesktop } = useDevice();
  return (
    <Box fill style={{ background: "#000", color: "#fff" }}>
      {/* Sección principal */}
      <Box height="100vh" align="center" pad="medium">
        <Heading level={1} size="large" id="page-heading">
          Simulador de Vaca
        </Heading>
        <Text size="large" color="dark-6" margin={{ bottom: "medium" }}>
          Una experiencia honesta sobre la realidad de las vacas en la industria
          lechera.
        </Text>
        <Button
          label="Empezar simulación"
          onClick={scrollToSimulation}
          primary
        />
        <Box
          direction={isDesktop ? "row" : "column"}
          gap="medium"
          align="center"
          justify="center"
          pad="medium"
        >
          <Button
            label="¿Por qué un único tipo de explotación?"
            onClick={() => setShowModal("explotacion")}
          />
          <Button
            label="Quiero participar voluntariamente"
            onClick={() => setShowModal("participar")}
          />
          <Button
            label="Proyectos relacionados"
            onClick={() => setShowModal("proyectos")}
          />
        </Box>
      </Box>

      {showModal === "explotacion" && (
        <Layer
          responsive={false}
          onEsc={() => setShowModal(null)}
          onClickOutside={() => setShowModal(null)}
        >
          <Box pad="medium">
            <Heading level={3}>¿Por qué un único tipo de explotación?</Heading>
            <Text>
              Lo que inspiró este proyecto fue la idealización de la vida de los
              animales en algunos simuladores. Sin embargo, a futuro se sumarán
              más entornos que representen otras formas de explotación.
            </Text>
          </Box>
        </Layer>
      )}

      {showModal === "participar" && (
        <Layer
          responsive={false}
          onEsc={() => setShowModal(null)}
          onClickOutside={() => setShowModal(null)}
        >
          <Box pad="medium">
            <Heading level={3}>Quiero participar voluntariamente</Heading>
            <Text>
              Si tienes conocimientos en redacción de textos sobre veganismo,
              diseño gráfico, diseño 3D o programación frontend (con React),
              escríbeme en Instagram:{" "}
              <a
                href="https://www.instagram.com/ignacio_barocchi"
                target="_blank"
              >
                @ignacio_barocchi
              </a>
            </Text>
          </Box>
        </Layer>
      )}

      {showModal === "proyectos" && (
        <Layer
          responsive={false}
          onEsc={() => setShowModal(null)}
          onClickOutside={() => setShowModal(null)}
        >
          <Box pad="medium">
            <Heading level={3}>Proyectos relacionados</Heading>
            <Text>
              <a
                href="https://www.instagram.com/intervencion_v"
                target="_blank"
              >
                @intervencion_v
              </a>
            </Text>
          </Box>
        </Layer>
      )}
    </Box>
  );
}
