import { Text } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";

export const cowPenVertices: { [x: string]: [number, number] } = {
  // Limits
  AL: [4.5, 1.5],
  BL: [2.5, 4.5],
  CL: [-2.5, 4.5],
  DL: [-4.5, 1.5],
  EL: [-4.5, -2.5],
  FL: [-2.5, -4.5],
  GL: [2.5, -4.5],
  HL: [4.5, -2.5],

  // Center
  IC: [2.5, 1.5],
  JC: [-2.5, 1.5],
  KC: [-2.5, -2.5],
  LC: [2.5, -2.5],
};
const CowPenMapVertices = () => {
  return (
    <RigidBody type={"fixed"}>
      {Object.entries(cowPenVertices).map(([nodeName, value], i) => {
        console.log(nodeName);
        console.log(value);
        return (
          <>
            <Text
              scale={[0.5, 0.5, 0.5]}
              position={[value[0], 0.5, value[1]]}
              color="white" // default
              anchorX="center" // default
              anchorY="middle" // default
            >
              {nodeName}
            </Text>
            <CylinderCollider
              args={[0.1, 0.5]}
              key={`vtx-${i}`}
              name={nodeName}
              position={[value[0], 0.5, value[1]]}
            />
          </>
        );
      })}
    </RigidBody>
  );
};

export default CowPenMapVertices;
