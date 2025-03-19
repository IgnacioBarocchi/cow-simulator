import { UIProvider, Box, Button, Heading, Spinner, Text } from "@mono/ui";
import { Close, Info } from "grommet-icons";
import { Suspense, lazy, useState } from "react";

import { Html } from "@react-three/drei";
import { fontStack } from "@mono/ui/src/components/ui-provider/ui-config.ts";

const ViewMoreLayer = lazy(() => import("./view-more-layer.tsx"));

const limit = 140;

const getTrimmedBody = (text: string[]) => {
  let trimmedText: string[] = [];
  let charCount = 0;

  for (const paragraph of text) {
    if (charCount + paragraph.length > limit) {
      if (charCount === 0) {
        let trimmed = paragraph.slice(0, limit);
        let lastSpaceIndex = trimmed.lastIndexOf(" ");

        if (lastSpaceIndex !== -1) {
          trimmed = trimmed.slice(0, lastSpaceIndex);
        }

        trimmedText.push(trimmed + "...");
      }
      break;
    }
    trimmedText.push(paragraph);
    charCount += paragraph.length;
  }

  if (
    trimmedText.length > 0 &&
    !trimmedText[trimmedText.length - 1].endsWith("...")
  ) {
    trimmedText[trimmedText.length - 1] += "...";
  }

  return trimmedText;
};

const Hint3D = ({ position, info }) => {
  const [show, setShow] = useState(false);
  const [showFull, setShowFull] = useState(false);

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
        style={{
          fontFamily: fontStack,
        }}
      >
        {!show && (
          <Button
            style={{ pointerEvents: "auto" }}
            icon={<Info color="white" />}
            onClick={() => setShow(true)}
          />
        )}
        {show && (
          <Box pad="medium" gap="small" width="medium">
            <Box direction="row" align="center" justify="between">
              <Heading level={3} margin="none">
                {info.title}
              </Heading>
              <Button icon={<Close />} onClick={() => setShow(false)} plain />
            </Box>
            {getTrimmedBody(info.body).map((body, index) => {
              return <Text key={index}>{body}</Text>;
            })}
            {info.body.join(" ").length > limit && (
              <Text
                color="brand"
                onClick={() => setShowFull(true)}
                style={{ cursor: "pointer" }}
              >
                ver más
              </Text>
            )}
          </Box>
        )}
        {showFull && (
          <Suspense fallback={<Spinner />}>
            <UIProvider>
              <ViewMoreLayer setShowFull={setShowFull} info={info} />
            </UIProvider>
          </Suspense>
        )}
      </Html>
    </group>
  );
};

export default Hint3D;
