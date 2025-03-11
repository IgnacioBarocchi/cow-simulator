import { Layer, LayerExtendedProps } from "grommet";

import { FC } from "react";
import { useDevice } from "use-device-react";

type Omited = "";
type InfoLayerProps = Omit<LayerExtendedProps, Omited>;

const InfoLayer: FC<InfoLayerProps> = (props) => {
  const { isDesktop } = useDevice();

  return (
    <Layer
      {...props}
      full={isDesktop}
      responsive={!isDesktop}
      margin={isDesktop ? "large" : "none"}
      style={{ overflow: "auto" }}
      background="background"
      animation="fadeIn"
    >
      {props.children}
    </Layer>
  );
};

export default InfoLayer;
