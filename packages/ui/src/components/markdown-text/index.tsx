import { FC, useState } from "react";
import { Markdown, Paragraph } from "grommet";

import { fontStack } from "../ui-provider/ui-config";

const customComponents = {
  p: {
    component: Paragraph,
    props: {
      fill: true,
    },
  },
};

interface MarkdownTextProps {
  gistEndpoint: string;
}
const MarkdownText: FC<MarkdownTextProps> = ({ gistEndpoint }) => {
  const [text, setText] = useState("");
  const fetchData = async () => {
    try {
      console.log(gistEndpoint);
      const response = await fetch(gistEndpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      const files = data.files;

      const markdownText = Object.values(files)[0].content;

      console.log(markdownText);

      setText(markdownText);
    } catch (err) {
      console.error("Error fetching Gist:", err);
    }
  };

  fetchData();

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
