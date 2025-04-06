import { Box, Button, Card, Layer, Text } from "grommet";
import { useAtom } from "jotai";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { meetupFormAtom } from "../store/store";

const data = [
  { option: "PATERNAL" },
  { option: "VILLA CRESPO" },
  { option: "ALMAGRO" },
  { option: "CABALLITO" },
  { option: "FLORES" },
  { option: "FLORESTA" },
  { option: "SAN CRISTOBAL" },
  { option: "PRQ PATRICIOS" },
  { option: "VILLA URQUIZA" },
  { option: "COLEGIALES" },
  { option: "CHACABUCO" },
  { option: "PALERMO" },
  { option: "BELGRANO" },
  { option: "RECOLETA" },
  { option: "NUÑEZ" },
];

export const RandomWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [show, setShow] = useState(false);
  const [_, setValue] = useAtom(meetupFormAtom);

  const handleClick = () => {
    const randomPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(randomPrizeNumber);
    setMustSpin(true);
  };

  const handleStop = () => {
    setMustSpin(false);

    setValue((prev) => ({ ...prev, place: data[prizeNumber].option }));

    setShow(true);
  };

  return (
    <>
      <Wheel
        prizeNumber={prizeNumber}
        data={data}
        mustStartSpinning={mustSpin}
        backgroundColors={["#6FFFB0", "black"]}
        textColors={["#ffffff"]}
        onStopSpinning={handleStop}
      />
      <Button label="Elegir" onClick={handleClick} />
      <Box>
        {show && (
          <Layer
            onEsc={() => setShow(false)}
            onClickOutside={() => setShow(false)}
          >
            <Box
              border={true}
              round={true}
              width="medium"
              pad="medium"
              gap="medium"
            >
              <Text>{data[prizeNumber].option}</Text>
              <Button label="Cerrar" onClick={() => setShow(false)} />
            </Box>
          </Layer>
        )}
      </Box>
    </>
  );
};
export default RandomWheel;
