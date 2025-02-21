import { Box, Button, Grommet, Heading, Layer, Text } from "grommet";
import { Close, Info } from "grommet-icons";

import { Html } from "@react-three/drei";
import { useState } from "react";

const theme = {
  global: {
    font: {
      family: "Arial",
    },
  },
};

const Hint3D = ({ position, info }) => {
  const [show, setShow] = useState(false);

  return (
    <group position={position}>
      <Html
        as="div"
        prepend
        center
        fullscreen
        distanceFactor={2}
        zIndexRange={[100, 0]}
        transform
        sprite
        onOcclude={(hidden) => null}
      >
        {!show && (
          <Button
            style={{ pointerEvents: "auto" }}
            color="white"
            icon={<Info />}
            onClick={() => setShow(!show)}
          />
        )}
        {show && (
          // <Layer
          //   onEsc={() => setShow(false)}
          //   onClickOutside={() => setShow(false)}
          //   background="transparent"
          // >
          <Box pad="medium" gap="small" width="medium">
            <Box direction="row" align="center" justify="between">
              <Heading level={3} margin="none">
                {info.title}
              </Heading>
              <Button icon={<Close />} onClick={() => setShow(false)} plain />
            </Box>
            {info.body.map((body) => (
              <Text>{body}</Text>
            ))}
          </Box>
          // </Layer>
        )}
      </Html>
    </group>
  );
};

export default Hint3D;
