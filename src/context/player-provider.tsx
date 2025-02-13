import { createContext } from "react";
import { useMachine } from "@xstate/react";
import PlayerMachine from "../machines/PlayerMachine";
import { KeyboardControls } from "@react-three/drei";
import keysMap from "../lib/keysMap";

export const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [state, send] = useMachine(PlayerMachine);

  return (
    <PlayerContext.Provider value={{ state, send }}>
      <KeyboardControls map={keysMap}>{children}</KeyboardControls>
    </PlayerContext.Provider>
  );
};
