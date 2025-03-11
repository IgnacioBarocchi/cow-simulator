import { MarkdownText } from "@mono/ui";
import text from "./quiero-participar.md?raw";

const Colaborate = () => {
  return <MarkdownText text={String(text)} />;
};

export default Colaborate;
