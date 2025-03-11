import { MarkdownText } from "@mono/ui";
import text from "./why-one-kind.md?raw";

const WhyOneKind = () => {
  return <MarkdownText text={String(text)} />;
};

export default WhyOneKind;
