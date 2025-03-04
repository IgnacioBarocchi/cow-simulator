import { useMemo, useState } from "react";

import CollapsibleSidebar from "../collapisble-sidebar";
import { Info } from "grommet-icons";
import { Text } from "@mono/ui";
import { nanoid } from "nanoid";
import { selectedSceneAtom } from "../../scene-selector";
import { useAtom } from "jotai";

const sceneData = [
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
];

const Sidebar = () => {
  const [index] = useAtom(selectedSceneAtom);

  const sceneInfo = useMemo(
    () => sceneData[index],

    [index]
  ) || {
    title: "No implementado",
    body: ["implementar"],
  };

  return (
    <CollapsibleSidebar
      title={sceneInfo.title}
      icon={<Info color="#DADADA" />}
      Content={() =>
        sceneInfo.body.map((content) => (
          <Text key={nanoid()} margin={{ top: "small" }}>
            {content}
          </Text>
        ))
      }
    />
  );
};

export default Sidebar;
