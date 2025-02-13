import { useContext } from "react";
import { PlayerContext } from "../context/player-provider";

export default function usePlayerMachine() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
