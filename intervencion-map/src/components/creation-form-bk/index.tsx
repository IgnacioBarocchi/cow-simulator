import { Grid, Box, Heading, ResponsiveContext } from "grommet";
import RandomWheel from "../random-wheel";
import { WhatsAppMessageForm } from "./whatsapp-message-form";
import { NeighborhoodForm } from "./neighborhood-form";

export const CreationForm = () => {
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Grid
          rows={
            size === "small"
              ? ["auto", "auto", "auto", "auto"]
              : ["xsmall", "large"]
          }
          columns={size === "small" ? ["auto"] : ["auto", "auto", "auto"]}
          gap="medium"
          areas={
            size === "small"
              ? [
                  { name: "header", start: [0, 0], end: [0, 0] },
                  { name: "wheel", start: [0, 1], end: [0, 1] },
                  { name: "place", start: [0, 2], end: [0, 2] },
                  { name: "whatsapp", start: [0, 3], end: [0, 3] },
                ]
              : [
                  { name: "header", start: [0, 0], end: [2, 0] },
                  { name: "wheel", start: [0, 1], end: [0, 1] },
                  { name: "place", start: [1, 1], end: [1, 1] },
                  { name: "whatsapp", start: [2, 1], end: [2, 1] },
                ]
          }
        >
          <Box gridArea="header" justify="center" align="center">
            <Heading pad="large" size="large">
              Eventos
            </Heading>
          </Box>
          <Box gridArea="wheel">
            <NeighborhoodForm />
          </Box>
          <Box gridArea="place">
            <WhatsAppMessageForm />
          </Box>
          <Box gridArea="whatsapp">
            <WhatsAppMessageForm />
          </Box>
        </Grid>
      )}
    </ResponsiveContext.Consumer>
  );
};
{
  /* format: {dd} de {day name} de {month name} */
}
{
  /* <Markdown>✊🏽🔥 ***INTERVENCIÓN V***🔥✊🏽</Markdown>
  <Markdown>Fecha y día: {value.date.toString()}</Markdown>
  <Markdown>
  Lugar : {value.place} Punto de encuentro: {value.address}
  </Markdown>
            <Markdown>Hora: {value.time} hs **puntual**</Markdown> */
}
