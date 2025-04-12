import { MicroForm } from "./micro-form";
import { Select } from "grommet-icons";
import { meetupFormAtom } from "../../store/store";
import { useAtomValue } from "jotai";

const AvenueSelectdep = () => {
  const [{ address }] = useAtomValue(meetupFormAtom);

  return (
    <MicroForm
      buttons={[() => <></>]}
      Inputs={() => (
        <Select
          closeOnChange={false}
          searchPlaceholder="Buscá la primera avenida"
          options={formState.avenueOptions}
          placeholder="Seleccioná la primera avenida"
          onChange={handleAvenueChange}
          onSearch={handleAvenueSearch("avenueOptions")}
          value={address[0]}
        />
      )}
    />
  );
};

export default AvenueSelectdep;
