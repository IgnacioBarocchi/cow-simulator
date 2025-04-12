import { meetupFormAtom, selectedValuesAtom } from "../../store/store";
import { useMemo, useState } from "react";

import { Select } from "@mono/ui";
import { preset } from "../../constants/colors";
import { useAtom } from "jotai";

const getSearchFn = (search: string) => (o: string) =>
  o.toLowerCase().startsWith(search.toLowerCase());
const NeighborhoodSelect = () => {
  const [selected, setSelected] = useAtom(selectedValuesAtom);
  const flatOptions = preset.map((v) => v.option);
  const [search, setSearch] = useState("");

  const options = useMemo(
    () =>
      flatOptions.filter((o) =>
        o.toLowerCase().startsWith(search.toLowerCase())
      ),
    [search, flatOptions]
  );

  const handleChange = (event: { value: string }) => {
    setSelected({
      selectedNeighborhood: event.value,
      selectedAvenue1: "",
      selectedAvenue2: "",
    });
  };

  return (
    <Select
      value={selected.selectedNeighborhood}
      options={options}
      searchPlaceholder="Buscá el barrio"
      placeholder="Seleccioná un barrio"
      onSearch={setSearch}
      onChange={handleChange}
    />
  );
};

export default NeighborhoodSelect;

// import { Select } from "@mono/ui";
// import { meetupFormAtom } from "../../store/store";
// import { preset } from "../../constants/colors";
// import { useAtom } from "jotai";

// const getSearchFn = (search: string) => (o: string) =>
//   o.toLowerCase().startsWith(search.toLowerCase());

// const NeighborhoodSelect = () => {
//   const [meetupForm, setMeetupForm] = useAtom(meetupFormAtom);
//   const flatOptions = preset.map((v) => v.option);

//   const handleSearch = (search: string) => {
//     setMeetupForm((prev) => ({
//       ...prev,
//       options: {
//         ...prev.options,
//         neighborhood: flatOptions.filter(getSearchFn(search)),
//       },
//     }));
//   };

//   const handleChange = (event: { value: string }) => {
//     setMeetupForm((prev) => ({
//       value: {
//         ...prev.value,
//         selectedNeighborhood: event.value,
//         selectedAvenue1: "",
//         selectedAvenue2: "",
//         selectedAddress: [],
//       },
//       options: {
//         ...prev.options,
//         avenue1: [],
//         avenue2: [],
//       },
//     }));
//   };

//   return (
//     <Select
//       name="nb-select"
//       id="nb-select"
//       closeOnChange={false}
//       searchPlaceholder="Buscá el barrio"
//       options={meetupForm.options.neighborhood}
//       placeholder="Seleccioná un barrio"
//       onSearch={handleSearch}
//       onChange={handleChange}
//       value={meetupForm.value.selectedNeighborhood}
//     />
//   );
// };

// export default NeighborhoodSelect;
