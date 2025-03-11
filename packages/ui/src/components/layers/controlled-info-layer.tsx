import { Button, Stack } from "grommet";
import { Close } from "grommet-icons";
import InfoLayer from "./info-layer";

const ControlledInfoLayer = ({ onClose, children }) => {
  return (
    <InfoLayer onClickOutside={onClose}>
      <Stack anchor="top-right" style={{ zIndex: 4 }}>
        {children}
        <Button margin="medium" icon={<Close />} onClick={onClose} plain />
      </Stack>
    </InfoLayer>
  );
};

export default ControlledInfoLayer;
