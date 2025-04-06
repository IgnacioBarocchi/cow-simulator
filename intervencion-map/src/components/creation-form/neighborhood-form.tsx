import { Button, Collapsible, Select } from "grommet";
import { useAtom } from "jotai";
import { meetupFormAtom } from "../../store/store";
import { useCallback, useState } from "react";
import { MicroForm } from "./micro-form";
import avenues from "../map/data/avenidas.geo.json";

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
  const [formState, setFormState] = useState({
    neighborhoodOptions: flatOptions,
    avenueOptions: [],
    secondAvenueOptions: [],
  });
  const [meetupForm, setMeetupForm] = useAtom(meetupFormAtom);

  const filterAvenuesByNeighborhood = useCallback(() => {
    return [
      ...new Set(
        avenues.features
          .filter((v) => v.properties.BARRIO === meetupForm.place)
          .map((v) => v.properties.nomoficial)
      ),
    ];
  }, [meetupForm.place]);

  const handleNeighborhoodSearch = (search: string) => {
    setFormState((prev) => ({
      ...prev,
      neighborhoodOptions: flatOptions.filter((o) =>
        o.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
      ),
    }));
  };

  const handleAvenueSearch = (search: string) => {
    setFormState((prev) => ({
      ...prev,
      avenueOptions: formState.avenueOptions.filter((o) =>
        o.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
      ),
    }));
  };

  const handleSecondAvenueSearch = (search: string) => {
    setFormState((prev) => ({
      ...prev,
      secondAvenueOptions: formState.secondAvenueOptions.filter((o) =>
        o.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
      ),
    }));
  };

  const handleNeighborhoodChange = (event: { value: string }) => {
    setMeetupForm((prev) => ({ ...prev, place: event.value }));
    const avenuesByNeighborhood = filterAvenuesByNeighborhood();
    setFormState((prev) => ({
      ...prev,
      avenueOptions: avenuesByNeighborhood,
      secondAvenueOptions: [],
    }));
  };

  const handleAvenueChange = (event: { value: string }) => {
    setMeetupForm((prev) => ({
      ...prev,
      address: [event.value],
    }));
    setFormState((prev) => ({
      ...prev,
      secondAvenueOptions: formState.avenueOptions.filter(
        (o) => o !== event.value
      ),
    }));
  };

  const handleSecondAvenueChange = (event: { value: string }) => {
    setMeetupForm((prev) => ({
      ...prev,
      address: [...prev.address, event.value],
    }));
  };

  return (
    <>
      <MicroForm
        buttons={[() => <Button label="Elegir random" onClick={() => {}} />]}
        Inputs={() => (
          <Select
            closeOnChange={false}
            placeholder="select an option..."
            searchPlaceholder="Buscá el barrio"
            options={formState.neighborhoodOptions}
            placeholder="Seleccioná un barrio"
            onSearch={handleNeighborhoodSearch}
            onChange={handleNeighborhoodChange}
            value={meetupForm.place}
          />
        )}
      />
      <Collapsible open={Boolean(meetupForm.place)}>
        <MicroForm
          buttons={[() => <></>]}
          Inputs={() => (
            <Select
              closeOnChange={false}
              placeholder="select an option..."
              searchPlaceholder="Buscá la primera avenida"
              options={formState.avenueOptions}
              placeholder="Seleccioná la primera avenida"
              onChange={handleAvenueChange}
              onSearch={handleAvenueSearch}
              value={meetupForm.address[0]}
            />
          )}
        />
      </Collapsible>
      <Collapsible open={Boolean(meetupForm.address[0])}>
        <MicroForm
          buttons={[() => <></>]}
          Inputs={() => (
            <Select
              closeOnChange={false}
              placeholder="select an option..."
              searchPlaceholder="Buscá la segunda avenida"
              options={formState.secondAvenueOptions}
              placeholder="Seleccioná la segunda avenida"
              onChange={handleSecondAvenueChange}
              onSearch={handleSecondAvenueSearch}
              value={meetupForm.address[1]}
            />
          )}
        />
      </Collapsible>
    </>
  );
};

// import { Button, Collapsible, Select } from "grommet";
// import { useAtom } from "jotai";
// import { meetupFormAtom } from "../../store/store";
// import { useCallback,  useState } from "react";
// import { MicroForm } from "./micro-form";
// import avenues from "../map/data/avenidas.geo.json";

// const data = [
//   { option: "PATERNAL" },
//   { option: "VILLA CRESPO" },
//   { option: "ALMAGRO" },
//   { option: "CABALLITO" },
//   { option: "FLORES" },
//   { option: "FLORESTA" },
//   { option: "SAN CRISTOBAL" },
//   { option: "PRQ PATRICIOS" },
//   { option: "VILLA URQUIZA" },
//   { option: "COLEGIALES" },
//   { option: "CHACABUCO" },
//   { option: "PALERMO" },
//   { option: "BELGRANO" },
//   { option: "RECOLETA" },
//   { option: "NUÑEZ" },
// ];

// const flatOptions = data.map((v) => v.option);

// export const NeighborhoodForm = () => {
//   const [formState, setFormState] = useState({
//     neighborhoodOptions: flatOptions,
//     avenueOptions: [],
//   });
//   const [meetupForm, setMeetupForm] = useAtom(meetupFormAtom);

//   const filterAvenuesByNeighborhood = useCallback(() => {
//     return [
//       ...new Set(
//         avenues.features
//           .filter((v) => v.properties.BARRIO === meetupForm.place)
//           .map((v) => v.properties.nomoficial)
//       ),
//     ];
//   }, [meetupForm.place]);

//   const handleNeighborhoodSearch = (search: string) => {
//     setFormState((prev) => ({
//       ...prev,
//       neighborhoodOptions: flatOptions.filter((o) =>
//         o.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
//       ),
//     }));
//   };

//   const handleAvenueSearch = (search: string) => {
//     setFormState((prev) => ({
//       ...prev,
//       avenueOptions: formState.avenueOptions.filter((o) =>
//         o.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
//       ),
//     }));
//   };

//   const handleNeighborhoodChange = (event: { value: string }) => {
//     setMeetupForm((prev) => ({ ...prev, place: event.value }));
//     setFormState((prev) => ({
//       ...prev,
//       avenueOptions: filterAvenuesByNeighborhood(),
//     }));
//   };

//   const handleAvenueChange = (event: { value: string }) => {
//     setMeetupForm((prev) => ({ ...prev, address: event.value }));
//   };

//   return (
//     <>
//       <MicroForm
//         buttons={[() => <Button label="Elegir random" onClick={() => {}} />]}
//         Inputs={() => (
//           <Select
//             closeOnChange={false}
//             placeholder="select an option..."
//             searchPlaceholder="Buscá el barrio"
//             options={formState.neighborhoodOptions}
//             placeholder="Seleccioná un barrio"
//             onSearch={handleNeighborhoodSearch}
//             onChange={handleNeighborhoodChange}
//             value={meetupForm.place}
//           />
//         )}
//       />
//       <Collapsible open={meetupForm.place}>
//         <MicroForm
//           buttons={[() => <></>]}
//           Inputs={() => (
//             <Select
//               closeOnChange={false}
//               placeholder="select an option..."
//               searchPlaceholder="Buscá las avenidas"
//               options={formState.avenueOptions}
//               placeholder="Seleccioná las avenidas"
//               onChange={handleAvenueChange}
//               onSearch={handleAvenueSearch}
//               value={meetupForm.address}
//             />
//           )}
//         />
//       </Collapsible>
//       <Collapsible open={when address 1st part is not undefined}>
//         get another microform with the second part of the avenues, without the first part of course.
//       </Collapsible>
//     </>
//   );
// };
