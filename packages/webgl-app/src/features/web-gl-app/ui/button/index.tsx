import { ButtonExtendedProps, Button as GButton } from "@mono/ui";

const Button = (props: ButtonExtendedProps) => (
  <GButton style={{ pointerEvents: "auto" }} {...props} />
);

export default Button;
