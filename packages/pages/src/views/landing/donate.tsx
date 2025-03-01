import {
  Box,
  Button,
  Collapsible,
  Copy,
  Favorite,
  InfoButton,
  Notification,
  Text,
  Ticket,
} from "@mono/ui";

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
      <Button
        label={text}
        icon={<Copy />}
        onClick={copyToClipboard}
        color="#121212"
        style={{ background: "black", color: "#DADADA" }}
      />
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
          <Text color="light-2">Copia los alias</Text>
          {aliases.map((alias) => (
            <Box key={alias} direction="row" align="center" gap="small">
              <CopyButton text={alias} />
            </Box>
          ))}
        </Box>
      </Collapsible>
      <InfoButton
        style={{ background: "transparent" }}
        icon={
          <Box
            width="xxsmall"
            height="xxsmall"
            align="center"
            justify="center"
            background="black"
            style={{ borderRadius: "100%" }}
          >
            <Ticket color="light-2" />
          </Box>
        }
        toggle={() => setOpen(!open)}
      />
    </>
  );
};

export default Donate;
