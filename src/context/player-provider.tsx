import { useMachine } from "@xstate/react";
import { createContext } from "react";
import PlayerMachine from "../machines/PlayerMachine";

export const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [state, send] = useMachine(PlayerMachine);

  return (
    <PlayerContext.Provider value={{ state, send }}>
      {children}
    </PlayerContext.Provider>
  );
};
