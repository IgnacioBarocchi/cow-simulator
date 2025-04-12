import { Button } from "grommet";
import { logged } from "../../store/store";
import { useSetAtom } from "jotai";

const LogOutButton = () => {
  const setLogged = useSetAtom(logged);

  return <Button label="Salir" onClick={() => setLogged(false)} primary />;
};

export default LogOutButton;
