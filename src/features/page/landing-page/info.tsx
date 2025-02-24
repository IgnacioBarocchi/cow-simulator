import { Box, Button, Collapsible, Heading, Layer, Text } from "grommet";

import { block } from "million/react";
import { useDevice } from "use-device-react";
import { useState } from "react";

const Info = block(() => {
  const [open, setOpen] = useState(false);

  const [showModal, setShowModal] = useState(null);
  const { isDesktop } = useDevice();

  return (
    <Box align="start">
      <Button onClick={() => setOpen(!open)} label="Info" />
      <Collapsible open={open} direction="vertical" minSpeed={1000}>
        <>
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
          {showModal === "explotacion" && (
            <Layer
              responsive={false}
              onEsc={() => setShowModal(null)}
              onClickOutside={() => setShowModal(null)}
            >
              <Box pad="medium">
                <Heading level={3}>
                  ¿Por qué un único tipo de explotación?
                </Heading>
                <Text>
                  Lo que inspiró este proyecto fue la idealización de la vida de
                  los animales en algunos simuladores. Sin embargo, a futuro se
                  sumarán más entornos que representen otras formas de
                  explotación.
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
                  Si tienes conocimientos en redacción de textos sobre
                  veganismo, diseño gráfico, diseño 3D o programación frontend
                  (con React), escríbeme en Instagram:{" "}
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
        </>
      </Collapsible>
    </Box>
  );
});

export default Info;
