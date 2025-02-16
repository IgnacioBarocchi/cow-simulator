import { Box, Button, Collapsible, Text } from "grommet";
import { Close, Info } from "grommet-icons";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { selectedSceneAtom } from "../../scene-selector";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [index] = useAtom(selectedSceneAtom);

  const sceneInfo = useMemo(
    () =>
      [
        {
          title: "El Corral: Separación y Aislamiento",
          body: [
            "Varias veces al día, la vaca es llevada al ordeñador, un lugar donde apenas puede moverse. Sus ubres, hinchadas por una producción antinatural de leche, son conectadas a máquinas de ordeño. Este proceso repetitivo y forzado no solo genera estrés, sino que también causa mastitis, una dolorosa infección que inflama las ubres y las llena de pus y sangre.",
            "Para que la producción de leche no disminuya, la vaca es inseminada artificialmente una y otra vez, iniciando de nuevo el ciclo de embarazo, parto y separación de su cría. Su cuerpo se desgasta rápidamente, y su esperanza de vida, que en condiciones naturales sería de unos 20 años, se reduce a solo 4 o 5 años en la industria lechera.",
          ],
        },
        {
          title: "El Ordeñador: Dolor y Explotación",
          body: [
            "Cuando su cuerpo ya no puede producir leche en cantidades rentables, la vaca deja de ser útil para la industria. Su destino final es el matadero. Allí, es transportada en condiciones deplorables, muchas veces enferma o con heridas abiertas, y es sacrificada para convertir su carne en productos de bajo costo, como carne molida o comida para mascotas.",
            "La vida de una vaca lechera es una existencia de sufrimiento constante, marcada por la explotación y la indiferencia. Todo este dolor ocurre para satisfacer la demanda de productos lácteos, una realidad que pocas personas conocen o quieren ver.",
          ],
        },
      ][index],
    [index]
  ) || {
    title: "No implementado",
    body: ["implementar"],
  };

  return (
    <>
      <Button
        style={{
          pointerEvents: "auto",
        }}
        color="white"
        icon={<Info />}
        onClick={() => setOpen(!open)}
      />
      <Collapsible direction="horizontal" open={open}>
        <Box width="medium" pad="medium" align="start">
          <Box direction="row" justify="between" width="100%">
            <Text weight="bold">{sceneInfo.title}</Text>
            <Button
              style={{
                pointerEvents: "auto",
              }}
              icon={<Close />}
              onClick={() => setOpen(false)}
            />
          </Box>
          {sceneInfo.body.map((content) => (
            <Text margin={{ top: "small" }}>{content}</Text>
          ))}
        </Box>
      </Collapsible>
    </>
  );
};

export default Sidebar;
