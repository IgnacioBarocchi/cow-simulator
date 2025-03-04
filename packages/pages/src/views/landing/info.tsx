import {
  Box,
  Button,
  Collapsible,
  Heading,
  InfoButton,
  InfoLayer,
  Text,
} from "@mono/ui";

import IntervencionV from "../intervencion-v";
import { block } from "million/react";
import { useDevice } from "use-device-react";
import { useState } from "react";

const Info = block(() => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const { isDesktop } = useDevice();

  return (
    <Box align="start">
      <InfoButton
        toggle={() => {
          setOpen(!open);
        }}
        label="más información"
      />
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
              color="background"
              style={{ background: "black", color: "#DADADA" }}
              onClick={() => setShowModal("explotacion")}
            />
            <Button
              label="Quiero participar voluntariamente"
              color="background"
              style={{ background: "black", color: "#DADADA" }}
              onClick={() => setShowModal("participar")}
            />
            <Button
              label="Proyectos relacionados"
              color="background"
              style={{ background: "black", color: "#DADADA" }}
              onClick={() => setShowModal("proyectos")}
            />
          </Box>
          {showModal === "explotacion" && (
            <InfoLayer
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
            </InfoLayer>
          )}

          {showModal === "participar" && (
            <InfoLayer
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
            </InfoLayer>
          )}

          {showModal === "proyectos" && (
            <InfoLayer
              onEsc={() => setShowModal(null)}
              onClickOutside={() => setShowModal(null)}
            >
              <IntervencionV />
            </InfoLayer>
          )}
        </>
      </Collapsible>
    </Box>
  );
});

export default Info;
