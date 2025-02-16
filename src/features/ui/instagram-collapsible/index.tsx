import { Box, Button, Collapsible, Text } from "grommet";
import { Instagram } from "grommet-icons";
import { useState } from "react";

const theme = {
  global: {
    colors: {
      brand: "#E1306C",
    },
  },
};

const baseURL = "instagram.com";
const InstagramSidebar = () => {
  const [open, setOpen] = useState(false);

  const instagramAccounts = [
    { user: "@intervencion_v", link: `${baseURL}/intervencion_v` },
    { user: "@santuariosalvajes", link: `${baseURL}/santuariosalvajes` },
    { user: "@ignacio.barocchi", link: `${baseURL}/ignaciobarocchi` },
  ];

  return (
    <Box align="center" direction="row">
      <Button
        style={{ pointerEvents: "auto" }}
        icon={<Instagram />}
        onClick={() => setOpen(!open)}
      />

      <Collapsible direction="horizontal" open={open}>
        <Box
          width="small"
          pad="medium"
          elevation="medium"
          round="small"
          margin={{ left: "small" }}
          direction="row"
        >
          {instagramAccounts.map((account, index) => (
            <Text
              style={{ pointerEvents: "auto" }}
              key={index}
              margin={{ left: "small" }}
            >
              <a href={account.link} target="_blank">
                {account.user}
              </a>
            </Text>
          ))}
        </Box>
      </Collapsible>
    </Box>
  );
};

export default InstagramSidebar;
