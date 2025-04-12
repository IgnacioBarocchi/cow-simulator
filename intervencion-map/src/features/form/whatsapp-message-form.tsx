import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  DateInput,
  Select,
  Text,
} from "@mono/ui";
import { Clipboard, ShareOption } from "grommet-icons";
import { meetupFormAtom, selectedValuesAtom } from "../../store/store";
import { useAtom, useAtomValue } from "jotai";

import { MicroForm } from "./micro-form";
import { useMemo } from "react";

export const WhatsAppMessageForm = () => {
  const [formData, setFormData] = useAtom(meetupFormAtom);
  const { selectedNeighborhood, selectedAvenue1, selectedAvenue2 } =
    useAtomValue(selectedValuesAtom);

  const updateForm = (field: string, value: string | string[]) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleDateChange = (event: { value: string | string[] }) =>
    updateForm("date", event.value);

  const handleTimeChange = (option: { value: string }) =>
    updateForm("time", option.value);

  const renderButton = (label: string, onClick: () => void) => (
    <Button pad="small" label={label} onClick={onClick} />
  );

  const formattedDate = useMemo(() => {
    if (!formData.date) return "";
    return new Date(formData.date).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }, [formData.date]);

  return (
    <Box gap="large">
      <MicroForm
        buttons={[
          () => renderButton("Viernes", () => alert("implement this")),
          () => renderButton("Jueves", () => alert("implement this")),
        ]}
        Inputs={() => (
          <DateInput
            format="dd/mm/yyyy"
            value={formData.date}
            onChange={handleDateChange}
          />
        )}
      />

      <MicroForm
        buttons={[
          () =>
            renderButton("21:00hs", () => handleTimeChange({ value: "21" })),
          () =>
            renderButton("20:30hs", () => handleTimeChange({ value: "20:30" })),
          () =>
            renderButton("22:00hs", () => handleTimeChange({ value: "22" })),
        ]}
        Inputs={() => (
          <Select
            options={["20:30", "21", "22"]}
            placeholder="Seleccioná una hora"
            value={formData.time}
            onChange={handleTimeChange}
          />
        )}
      />

      <Card background="background-contrast" gap="small">
        <CardBody pad="small">
          <Text size="large" weight="bold" style={{ fontStyle: "italic" }}>
            ✊🏽🔥 INTERVENCIÓN V🔥✊🏽
          </Text>
          <Text size="medium">Fecha y día: {formattedDate}</Text>
          <Text size="medium">
            Lugar: {selectedNeighborhood} Punto de encuentro:{" "}
            {selectedAvenue1 + " y " + selectedAvenue2}
          </Text>
          <Text size="medium">
            Hora: {formData.time} hs <Text weight="bold">puntual</Text>
          </Text>
        </CardBody>
        <CardFooter pad={{ horizontal: "small" }} background="dark-2">
          <Button icon={<Clipboard color="text" />} hoverIndicator />
          <Button icon={<ShareOption color="text" />} hoverIndicator />
        </CardFooter>
      </Card>
    </Box>
  );
};
