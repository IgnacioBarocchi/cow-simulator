import {
  Box,
  Button,
  Collapsible,
  ControlledInfoLayer,
  InfoButton,
} from "@mono/ui";

import Colaborate from "../../../colaborate";
import IntervencionV from "../../../intervencion-v";
import WhyOneKind from "../../../why-one-kind";
// import { block } from "million/react";
import { useDevice } from "use-device-react";
import { useState } from "react";

const Info = /*block*/ () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const { isDesktop } = useDevice();
  const closeModal = () => setShowModal(null);

  const handleToggle = () => setOpen((prev) => !prev);

  const buttons = [
    {
      label: "¿Por qué un único tipo de explotación?",
      key: "explotacion",
      component: <WhyOneKind />,
    },
    {
      label: "Quiero participar voluntariamente",
      key: "participar",
      component: <Colaborate />,
    },
    {
      label: "Proyectos relacionados",
      key: "proyectos",
      component: <IntervencionV />,
    },
  ];

  return (
    <Box align="start">
      <InfoButton toggle={handleToggle} label="Más información" />
      <Collapsible open={open} direction="vertical" minSpeed={1000}>
        <Box
          direction={isDesktop ? "row" : "column"}
          gap="medium"
          align="center"
          justify="center"
          pad="medium"
        >
          {buttons.map(({ label, key }) => (
            <Button
              key={key}
              label={label}
              color="background"
              style={{ background: "black", color: "#DADADA" }}
              onClick={() => setShowModal(key)}
            />
          ))}
        </Box>

        {showModal && (
          <ControlledInfoLayer onClose={closeModal}>
            <Box pad="medium">
              {buttons.find(({ key }) => key === showModal)?.component}
            </Box>
          </ControlledInfoLayer>
        )}
      </Collapsible>
    </Box>
  );
};

export default Info;
