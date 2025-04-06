import {
  Box,
  Card,
  CardBody,
  Button,
  DateInput,
  CardFooter,
  Text,
  Select,
} from "grommet";
import { ShareOption, Clipboard } from "grommet-icons";
import { useAtom } from "jotai";
import { meetupFormAtom } from "../../store/store";
import { MicroForm } from "./micro-form";

export const WhatsAppMessageForm = () => {
  const [value, setValue] = useAtom(meetupFormAtom);
  const handleDateChange = (event) => {
    setValue((prev) => ({ ...prev, date: event.value }));
  };

  const handleTimeChange = (option) => {
    setValue((prev) => ({ ...prev, time: option.value }));
  };

  return (
    <Box gap="large">
      <MicroForm
        buttons={[
          () => <Button round={true} pad="small" label="Viernes" />,
          () => <Button round={true} pad="small" label="Jueves" />,
        ]}
        Inputs={() => (
          <DateInput
            format="dd/mm/yyyy"
            value={value.date}
            onChange={handleDateChange}
          />
        )}
      />
      <MicroForm
        buttons={[
          () => (
            <Button
              round={true}
              pad="small"
              label="21:00hs"
              onClick={() => {
                handleTimeChange({ value: "21" });
              }}
            />
          ),
          () => (
            <Button
              round={true}
              pad="small"
              label="20:30hs"
              onClick={() => {
                handleTimeChange({ value: "20:30" });
              }}
            />
          ),
          () => (
            <Button
              round={true}
              pad="small"
              label="22:00hs"
              onClick={() => {
                handleTimeChange({ value: "22" });
              }}
            />
          ),
        ]}
        Inputs={() => (
          <Select
            options={["20:30", "21", "22"]}
            placeholder="Seleccioná una hora"
            value={value.time}
            onChange={handleTimeChange}
          />
        )}
      />

      <Card
        background="background-contrast"
        // width="medium"
        gap="small"
      >
        <CardBody pad="small">
          <Text size="large" weight="bold" style={{ fontStyle: "italic" }}>
            ✊🏽🔥 INTERVENCIÓN V🔥✊🏽
          </Text>
          <Text size="medium">Fecha y día: {value.date}</Text>
          <Text size="medium">
            Lugar: {value.place} Punto de encuentro: {value.address}
          </Text>
          <Text size="medium">Hora: {value.time} hs **puntual**</Text>
        </CardBody>
        <CardFooter pad={{ horizontal: "small" }} background="dark-2">
          <Button icon={<Clipboard color="text" />} hoverIndicator />
          <Button icon={<ShareOption color="text" />} hoverIndicator />
        </CardFooter>
      </Card>
    </Box>
  );
};

{
  /* <Accordion>
        <AccordionPanel
          label="Fecha"
          width="medium"
          
        > */
}
{
  /* <Card background="background-contrast" pad="small" width="medium">
        <CardBody>
          <Box direction="column" gap="medium">
            <Box direction="row" gap="medium"></Box>
           
          </Box>
        </CardBody>
      </Card> */
}
{
  /* </AccordionPanel>
      </Accordion> */
}
{
  /* <Accordion>
        <AccordionPanel label="Whatsapp" width="medium"> */
}
{
  /* </AccordionPanel>
      </Accordion> */
}
{
  /* <Card pad="small" width="medium" background="background-contrast">
        <CardBody>
          <Box direction="column" gap="medium">
            <Box direction="row" gap="medium" align="center"></Box>
            <DateInput
              format="dd/mm/yyyy"
              value={value.date}
              onChange={handleDateChange}
            />
          </Box>
        </CardBody>
      </Card> */
}
{
  /* </AccordionPanel>
      </Accordion> */
}
{
  /* <Accordion>
        <AccordionPanel label="Hora" width="medium"> */
}
