import { ButtonExtendedProps, Button as GButton } from "grommet";

const Button = (props: ButtonExtendedProps) => (
  <GButton style={{ pointerEvents: "auto" }} {...props} />
);

export default Button;
