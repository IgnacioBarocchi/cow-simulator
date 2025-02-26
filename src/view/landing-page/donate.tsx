import { Box, Button, Collapsible, Notification, Text } from "grommet";
import { Copy, Favorite, Ticket } from "grommet-icons";

import { useState } from "react";

const CopyButton = ({ text }) => {
  const [showNotification, setShowNotification] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);

    setShowNotification(true);
  };

  return (
    <>
      {showNotification && (
        <Notification
          icon={<Favorite />}
          toast={{
            autoClose: true,
            position: "top-right",
          }}
          global
          title={`Alias copiado ${text}`}
          message={
            <Text>
              ir a{" "}
              <a href="https://mercadopago.com.ar" target="_blank">
                Mercado pago
              </a>
            </Text>
          }
          onClose={() => {
            setShowNotification(false);
          }}
        />
      )}
      <Button icon={<Copy />} onClick={copyToClipboard} />
    </>
  );
};

const Donate = () => {
  const [open, setOpen] = useState(false);
  const aliases = ["ignacio.choker", "random"];

  return (
    <>
      <Collapsible open={open}>
        <Box pad="small" gap="small">
          <Text>Copia los alias</Text>
          {aliases.map((alias, index) => (
            <Box key={index} direction="row" align="center" gap="small">
              <Text>{alias}</Text>
              <CopyButton text={alias} />
            </Box>
          ))}
        </Box>
      </Collapsible>
      <Button icon={<Ticket />} onClick={() => setOpen(!open)} label="" />
    </>
  );
};

export default Donate;
