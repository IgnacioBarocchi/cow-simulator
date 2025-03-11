import { FC, ReactNode } from "react";

import { Grommet } from "grommet";
import { standardTheme } from "./ui-config";

const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Grommet
      theme={standardTheme}
      themeMode="dark"
      background="transparent"
      style={{ colorScheme: "dark" }}
    >
      {children}
    </Grommet>
  );
};

export default UIProvider;
