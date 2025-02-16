import { Html } from "@react-three/drei";
import { Button, Text } from "grommet";
import { Info } from "grommet-icons";

const Hint3D = ({ position, index }) => {
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
        <Button
          style={{
            pointerEvents: "auto",
          }}
          color="white"
          icon={<Info />}
        />
      </Html>
    </group>
  );
};

export default Hint3D;
