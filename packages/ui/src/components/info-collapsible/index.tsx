import { FC, ReactNode } from "react";
import { Collapsible } from "grommet";
import { useState } from "react";
import CircleInfoButton, {
  CircleInfoButtonProps,
} from "../buttons/circle-info-button.tsx";

export interface InfoCollapsibleProps
  extends Pick<CircleInfoButtonProps, "Icon"> {
  children: ReactNode;
  direction?: "horizontal" | "vertical";
}

const InfoCollapsible: FC<InfoCollapsibleProps> = ({
  children,
  Icon,
  direction = "vertical",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Collapsible
        onBlur={() => {
          setOpen(false);
        }}
        open={open}
        direction={direction}
      >
        {children}
      </Collapsible>
      <CircleInfoButton
        Icon={Icon}
        toggle={() => {
          setOpen(!open);
        }}
      />
    </>
  );
};

export default InfoCollapsible;
