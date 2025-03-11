import InfoButton, { InfoButtonProps } from "./info-button";

import { Box } from "grommet";
import { FC } from "react";
import type { Icon as IconType } from "groomet-icons";

export type CircleInfoButtonProps = InfoButtonProps & { Icon: IconType };

const CircleInfoButton: FC<CircleInfoButtonProps> = ({ Icon, toggle }) => {
  return (
    <InfoButton
      style={{ background: "transparent" }}
      icon={
        <Box
          width="xxsmall"
          height="xxsmall"
          align="center"
          justify="center"
          background="black"
          style={{ borderRadius: "100%" }}
        >
          <Icon color="light-2" />
        </Box>
      }
      toggle={toggle}
    />
  );
};

export default CircleInfoButton;
