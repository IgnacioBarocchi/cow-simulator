import { Box, Button, Card, CardBody, CardHeader, Select } from "grommet";
import RandomWheel from "../random-wheel";
import { useAtom } from "jotai";
import { meetupFormAtom } from "../../store/store";
import { useState } from "react";
import { MicroForm } from "./micro-form";

const data = [
  { option: "PATERNAL" },
  { option: "VILLA CRESPO" },
  { option: "ALMAGRO" },
  { option: "CABALLITO" },
  { option: "FLORES" },
  { option: "FLORESTA" },
  { option: "SAN CRISTOBAL" },
  { option: "PRQ PATRICIOS" },
  { option: "VILLA URQUIZA" },
  { option: "COLEGIALES" },
  { option: "CHACABUCO" },
  { option: "PALERMO" },
  { option: "BELGRANO" },
  { option: "RECOLETA" },
  { option: "NUÑEZ" },
];

const flatOptions = data.map((v) => v.option);

export const NeighborhoodForm = () => {
  const [options, setOptions] = useState(flatOptions);
  const [value, setValue] = useAtom(meetupFormAtom);
  const handlePlaceChange = (event) => {
    setValue((prev) => ({ ...prev, place: event.value }));
  };
  return (
    <MicroForm
      buttons={[() => <Button label="Elegir random" onClick={() => {}} />]}
      Inputs={() => (
        <Select
          closeOnChange={false}
          placeholder="select an option..."
          searchPlaceholder="Buscá el barrio"
          options={options}
          placeholder="Seleccioná una barrio"
          onSearch={(search) => {
            setOptions(
              flatOptions.filter((o) =>
                o.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
              )
            );
          }}
          onChange={handlePlaceChange}
          value={value.place}
        />
      )}
    />
  );
};
/*
 */

// return (
//   <Card background="background-contrast" pad="small" gap="medium">
//     <CardBody>
//       <Box gap="medium" direction="column">
//         {/* <Select
//           closeOnChange={false}
//           placeholder="select an option..."
//           searchPlaceholder="Buscá el barrio"
//           options={options}
//           placeholder="Seleccioná una barrio"
//           onSearch={(search) => {
//             setOptions(
//               flatOptions.filter((o) =>
//                 o.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
//               )
//             );
//           }}
//           onChange={handlePlaceChange}
//           value={value.place}
//         /> */}
//         <RandomWheel />
//       </Box>
//     </CardBody>
//   </Card>
// );
