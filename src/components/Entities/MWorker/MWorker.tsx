import { FC } from "react";
import { Vector3 } from "three";
import { EntityNames } from "../../../lib/object3DHelper";
import AbstractPersonel from "../AbstractPersonel/AbstractPersonel";

const MWorker: FC<{
  initialVertext: Vector3;
  currentVertexPosition: Vector3;
  nextVertexPosition: Vector3;
}> = ({ initialVertext, currentVertexPosition, nextVertexPosition }) => {
  return (
    <AbstractPersonel
      initialVertext={initialVertext}
      currentVertexPosition={currentVertexPosition}
      nextVertexPosition={nextVertexPosition}
      entity={EntityNames.MWORKER}
    />
  );
};

export default MWorker;
