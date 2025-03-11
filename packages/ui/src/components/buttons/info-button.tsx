import { ButtonExtendedProps, Button as GButton } from "grommet";
import { FC, SetStateAction, useState } from "react";

type SetProps = "onClick" | "badge" | "color";
export type InfoButtonProps = Omit<ButtonExtendedProps, SetProps> & {
  toggle: () => (value: SetStateAction<boolean>) => void;
};
const InfoButton: FC<InfoButtonProps> = (props) => {
  const [wasOpen, setWasOpen] = useState(false);
  const { toggle } = props;

  return (
    <GButton
      {...props}
      color="background"
      badge={!wasOpen}
      onClick={() => {
        toggle();
        if (!wasOpen) {
          setWasOpen(true);
        }
      }}
      style={{
        background: "black",
        color: "#DADADA",
        ...{ ...props?.style },
      }}
    />
  );
};

export default InfoButton;
