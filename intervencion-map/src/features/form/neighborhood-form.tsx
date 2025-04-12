import { Button, Collapsible } from "@mono/ui";
import { Suspense, lazy } from "react";

import { MicroForm } from "./micro-form";
import NeighborhoodSelect from "./NeighborhoodSelect";
import { geojsonUrls } from "../../constants/colors";
import { selectedValuesAtom } from "../../store/store"; // Nuevo átomo
import { useAtomValue } from "jotai";
import useGeoJSONData from "../map/hooks/useGeoJSONData";

const AvenueSelect = lazy(() => import("./AvenueSelect"));

export const NeighborhoodForm = () => {
  const selected = useAtomValue(selectedValuesAtom);
  const { data } = useGeoJSONData(geojsonUrls.avenues);

  return (
    <>
      <MicroForm
        buttons={[() => <Button label="Elegir random" onClick={() => {}} />]}
        Inputs={() => <NeighborhoodSelect />}
      />

      {data && (
        <>
          <Collapsible open={!!selected.selectedNeighborhood}>
            <MicroForm
              buttons={[() => <></>]}
              Inputs={() => (
                <Suspense fallback={null}>
                  <AvenueSelect
                    neighborhood={selected.selectedNeighborhood}
                    data={data}
                    type="avenue1"
                  />
                </Suspense>
              )}
            />
          </Collapsible>

          <Collapsible open={!!selected.selectedAvenue1}>
            <MicroForm
              buttons={[() => <></>]}
              Inputs={() => (
                <Suspense fallback={null}>
                  <AvenueSelect
                    neighborhood={selected.selectedNeighborhood}
                    data={data}
                    type="avenue2"
                  />
                </Suspense>
              )}
            />
          </Collapsible>
        </>
      )}
    </>
  );
};
// import { Button, Collapsible } from "@mono/ui";
// import { useAtomValue } from "jotai";
// import { Suspense, lazy } from "react";
// import { meetupFormAtom } from "../../store/store";
// import NeighborhoodSelect from "./NeighborhoodSelect";
// import { MicroForm } from "./micro-form";
// import useGeoJSONData from "../map/hooks/useGeoJSONData";
// import { geojsonUrls } from "../../constants/colors";
// // const NeighborhoodSelect = lazy(() => import("./NeighborhoodSelect"));
// const AvenueSelect = lazy(() => import("./AvenueSelect"));

// export const NeighborhoodForm = () => {
//   const meetupForm = useAtomValue(meetupFormAtom);
//   const { data, error } = useGeoJSONData(geojsonUrls.avenues);

//   return (
//     <>
//       <MicroForm
//         buttons={[() => <Button label="Elegir random" onClick={() => {}} />]}
//         Inputs={() => (
//           <NeighborhoodSelect />
//           // <Suspe nse fallback={null}>
//           // </Suspense>
//         )}
//       />
//       {data && (
//         <>
//           <Collapsible open={!!meetupForm.value.selectedNeighborhood}>
//             <MicroForm
//               buttons={[() => <></>]}
//               Inputs={() => (
//                 <Suspense fallback={null}>
//                   <AvenueSelect
//                     neighborhood={meetupForm.value.selectedNeighborhood}
//                     data={data}
//                     type="avenue1"
//                   />
//                 </Suspense>
//               )}
//             />
//           </Collapsible>

//           <Collapsible open={!!meetupForm.value.selectedAvenue1}>
//             <MicroForm
//               buttons={[() => <></>]}
//               Inputs={() => (
//                 <Suspense fallback={null}>
//                   <AvenueSelect
//                     neighborhood={meetupForm.value.selectedNeighborhood}
//                     data={data}
//                     type="avenue2"
//                   />
//                 </Suspense>
//               )}
//             />
//           </Collapsible>
//         </>
//       )}
//     </>
//   );
// };

// import { Suspense, lazy } from "react";
// import { MicroForm } from "./micro-form";
// import { Button, Collapsible } from "@mono/ui";
// import { useAtom } from "jotai";
// import { meetupFormAtom } from "../../store/store";

// const NeighborhoodSelect = lazy(() => import("./NeighborhoodSelect"));
// const Avenue1Select = lazy(() => import("./Avenue1Select"));
// const Avenue2Select = lazy(() => import("./Avenue2Select"));

// export const NeighborhoodForm = () => {
//   const [meetupForm] = useAtom(meetupFormAtom);

//   return (
//     <>
//       <MicroForm
//         buttons={[() => <Button label="Elegir random" onClick={() => {}} />]}
//         Inputs={() => (
//           <Suspense fallback={null}>
//             <NeighborhoodSelect />
//           </Suspense>
//         )}
//       />
//       <Collapsible open={!!meetupForm.value.selectedNeighborhood}>
//         <MicroForm
//           buttons={[() => <></>]}
//           Inputs={() => (
//             <Suspense fallback={null}>
//               <Avenue1Select />
//             </Suspense>
//           )}
//         />
//       </Collapsible>
//       <Collapsible open={!!meetupForm.value.selectedAvenue1}>
//         <MicroForm
//           buttons={[() => <></>]}
//           Inputs={() => (
//             <Suspense fallback={null}>
//               <Avenue2Select />
//             </Suspense>
//           )}
//         />
//       </Collapsible>
//     </>
//   );
// };

// // import { Button, Collapsible, Select } from "@mono/ui";
// // import { useCallback, useEffect } from "react";
// // import { MicroForm } from "./micro-form";
// // import { geojsonUrls, preset } from "../../constants/colors";
// // import { meetupFormAtom } from "../../store/store";
// // import { useAtom } from "jotai";
// // import useGeoJSONData from "../map/hooks/useGeoJSONData";

// // const getSearchFn = (search: string) => (o: string) =>
// //   o.toLocaleLowerCase().startsWith(search.toLocaleLowerCase());

// // const flatNeighborhoodOptions = preset.map((v) => v.option);

// // export const NeighborhoodForm = () => {
// //   const { data, error } = useGeoJSONData(geojsonUrls.avenues);
// //   const [meetupForm, setMeetupForm] = useAtom(meetupFormAtom);

// //   // Hydrate neighborhood options on mount
// //   useEffect(() => {
// //     setMeetupForm((prev) => ({
// //       ...prev,
// //       options: {
// //         ...prev.options,
// //         neighborhood: flatNeighborhoodOptions,
// //       },
// //     }));
// //   }, [setMeetupForm]);

// //   const filterAvenuesByNeighborhood = useCallback(
// //     (neighborhood: string) => {
// //       if (!data?.features) return [];

// //       const filtered = data.features
// //         .filter((f) => f.properties.BARRIO === neighborhood)
// //         .map((f) => f.properties.nomoficial);

// //       return [...new Set(filtered)];
// //     },
// //     [data]
// //   );

// //   const updateNeighborhood = (event: { value: string }) => {
// //     const newNeighborhood = event.value;
// //     const avenues = filterAvenuesByNeighborhood(newNeighborhood);

// //     setMeetupForm((prev) => ({
// //       value: {
// //         ...prev.value,
// //         selectedNeighborhood: newNeighborhood,
// //         selectedAddress: [],
// //         selectedAvenue1: "",
// //         selectedAvenue2: "",
// //       },
// //       options: {
// //         ...prev.options,
// //         avenue1: avenues,
// //         avenue2: [],
// //       },
// //     }));
// //   };

// //   const updateAvenue1 = (event: { value: string }) => {
// //     const avenue1 = event.value;
// //     setMeetupForm((prev) => ({
// //       value: {
// //         ...prev.value,
// //         selectedAvenue1: avenue1,
// //         selectedAddress: [avenue1],
// //         selectedAvenue2: "",
// //       },
// //       options: {
// //         ...prev.options,
// //         avenue2: prev.options.avenue1.filter((a) => a !== avenue1),
// //       },
// //     }));
// //   };

// //   const updateAvenue2 = (event: { value: string }) => {
// //     const avenue2 = event.value;
// //     setMeetupForm((prev) => ({
// //       ...prev,
// //       value: {
// //         ...prev.value,
// //         selectedAvenue2: avenue2,
// //         selectedAddress: [prev.value.selectedAvenue1, avenue2],
// //       },
// //     }));
// //   };

// //   const searchNeighborhood = (search: string) => {
// //     setMeetupForm((prev) => ({
// //       ...prev,
// //       options: {
// //         ...prev.options,
// //         neighborhood: flatNeighborhoodOptions.filter(getSearchFn(search)),
// //       },
// //     }));
// //   };

// //   const searchAvenue = (key: "avenue1" | "avenue2") => (search: string) => {
// //     setMeetupForm((prev) => ({
// //       ...prev,
// //       options: {
// //         ...prev.options,
// //         [key]: prev.options[key].filter(getSearchFn(search)),
// //       },
// //     }));
// //   };

// //   const {
// //     value: { selectedNeighborhood, selectedAvenue1, selectedAvenue2 },
// //     options: { neighborhood, avenue1, avenue2 },
// //   } = meetupForm;

// //   if (error) return null;

// //   return (
// //     <>
// //       <MicroForm
// //         buttons={[() => <Button label="Elegir random" onClick={() => {}} />]}
// //         Inputs={() => (
// //           <Select
// //             closeOnChange={false}
// //             searchPlaceholder="Buscá el barrio"
// //             options={neighborhood}
// //             placeholder="Seleccioná un barrio"
// //             onSearch={searchNeighborhood}
// //             onChange={updateNeighborhood}
// //             value={selectedNeighborhood}
// //           />
// //         )}
// //       />
// //       <Collapsible open={!!selectedNeighborhood}>
// //         <MicroForm
// //           buttons={[() => <></>]}
// //           Inputs={() => (
// //             <Select
// //               closeOnChange={false}
// //               searchPlaceholder="Buscá la primera avenida"
// //               options={avenue1}
// //               placeholder="Seleccioná la primera avenida"
// //               onSearch={searchAvenue("avenue1")}
// //               onChange={updateAvenue1}
// //               value={selectedAvenue1}
// //             />
// //           )}
// //         />
// //       </Collapsible>
// //       <Collapsible open={!!selectedAvenue1}>
// //         <MicroForm
// //           buttons={[() => <></>]}
// //           Inputs={() => (
// //             <Select
// //               closeOnChange={false}
// //               searchPlaceholder="Buscá la segunda avenida"
// //               options={avenue2}
// //               placeholder="Seleccioná la segunda avenida"
// //               onSearch={searchAvenue("avenue2")}
// //               onChange={updateAvenue2}
// //               value={selectedAvenue2}
// //             />
// //           )}
// //         />
// //       </Collapsible>
// //     </>
// //   );
// // };
