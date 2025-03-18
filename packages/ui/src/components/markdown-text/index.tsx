import { Markdown, Paragraph } from "grommet";

import { FC } from "react";
import { fontStack } from "../ui-provider/ui-config";

const customComponents = {
  p: {
    as: Paragraph,
    component: Paragraph,
    props: {
      fill: true,
    },
  },
  img: {
    props: {
      style: { maxWidth: "500px" },
    },
  },
};

interface MarkdownTextProps {
  text: string;
}
const MarkdownText: FC<MarkdownTextProps> = ({ text }) => {
  return (
    <Markdown
      style={{
        fontFamily: fontStack,
      }}
      components={customComponents}
    >
      {text}
    </Markdown>
  );
};
export default MarkdownText;
