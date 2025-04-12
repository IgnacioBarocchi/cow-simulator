import { meetupFormAtom, selectedValuesAtom } from "../../store/store";
import { useEffect, useMemo, useState } from "react";

import { Select } from "@mono/ui";
import { filterAvenuesByNeighborhood } from "./utils/filterAvenuesByNeightborhood";
import { getSearchFn } from "./utils/search";
import { useAtom } from "jotai";

interface AvenueSelectProps {
  type: "avenue1" | "avenue2";
  data: GeoJSON;
  neighborhood: string;
}

const AvenueSelect = ({ type, data, neighborhood }: AvenueSelectProps) => {
  const [selected, setSelected] = useAtom(selectedValuesAtom);
  const [search, setSearch] = useState<string>("");

  const allOptions = useMemo(
    () => filterAvenuesByNeighborhood(data, neighborhood),
    [data, neighborhood]
  );

  const filteredOptions = useMemo(() => {
    let filtered = allOptions;
    if (type === "avenue2") {
      filtered = filtered.filter((a) => a !== selected.selectedAvenue1);
    }
    return filtered.filter(getSearchFn(search));
  }, [search, allOptions, selected.selectedAvenue1, type]);

  const handleChange = (event: { value: string }) => {
    const value = event.value;
    if (type === "avenue1") {
      setSelected({
        ...selected,
        selectedAvenue1: value,
        selectedAvenue2: "",
      });
    } else {
      setSelected({
        ...selected,
        selectedAvenue2: value,
      });
    }
  };

  const value =
    type === "avenue1" ? selected.selectedAvenue1 : selected.selectedAvenue2;

  return (
    <Select
      value={value}
      options={filteredOptions}
      onSearch={setSearch}
      onChange={handleChange}
      placeholder={`Seleccioná la ${type === "avenue1" ? "primera" : "segunda"} avenida`}
      searchPlaceholder={`Buscá la ${type === "avenue1" ? "primera" : "segunda"} avenida`}
    />
  );
};

// const AvenueSelect = ({ type, data, neighborhood }: AvenueSelectProps) => {
//   const [meetupForm, setMeetupForm] = useAtom(meetupFormAtom);
//   const {
//     value: { selectedAvenue1, selectedAvenue2 },
//     options,
//   } = meetupForm;

//   const filteredAvenues = useMemo(() => {
//     return filterAvenuesByNeighborhood(data, neighborhood);
//   }, [data, neighborhood]);

//   // Sync options when neighborhood changes
//   useEffect(() => {
//     setMeetupForm((prev) => ({
//       ...prev,
//       options: {
//         ...prev.options,
//         [type]:
//           type === "avenue1"
//             ? filteredAvenues
//             : prev.options.avenue1.filter((a) => a !== selectedAvenue1),
//       },
//     }));
//   }, [filteredAvenues, type, selectedAvenue1, setMeetupForm]);

//   const handleSearch = (search: string) => {
//     setMeetupForm((prev) => ({
//       ...prev,
//       options: {
//         ...prev.options,
//         [type]: filteredAvenues.filter(getSearchFn(search)),
//       },
//     }));
//   };

//   const handleChange = (event: { value: string }) => {
//     const selected = event.value;
//     if (type === "avenue1") {
//       setMeetupForm((prev) => ({
//         value: {
//           ...prev.value,
//           selectedAvenue1: selected,
//           selectedAvenue2: "",
//           selectedAddress: [selected],
//         },
//         options: {
//           ...prev.options,
//           avenue2: filteredAvenues.filter((a) => a !== selected),
//         },
//       }));
//     } else {
//       setMeetupForm((prev) => ({
//         ...prev,
//         value: {
//           ...prev.value,
//           selectedAvenue2: selected,
//           selectedAddress: [selectedAvenue1, selected],
//         },
//       }));
//     }
//   };

//   const value = type === "avenue1" ? selectedAvenue1 : selectedAvenue2;

//   return (
//     <Select
//       closeOnChange={false}
//       searchPlaceholder={`Buscá la ${type === "avenue1" ? "primera" : "segunda"} avenida`}
//       options={options[type]}
//       placeholder={`Seleccioná la ${type === "avenue1" ? "primera" : "segunda"} avenida`}
//       onSearch={handleSearch}
//       onChange={handleChange}
//       value={value}
//     />
//   );
// };

export default AvenueSelect;
