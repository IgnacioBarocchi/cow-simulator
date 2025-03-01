import { Box } from "@mono/ui";
import Button from "../button";
import InstagramSidebar from "../instagram-collapsible";
import Sidebar from "../info-collapsible";
import { Up } from "grommet-icons";
import { useDevice } from "use-device-react";

const ActionPanel = () => {
  const { isDesktop } = useDevice();

  return (
    <Box
      align="start"
      justify="start"
      pad="medium"
      margin={{ top: isDesktop ? "0" : "xlarge" }}
      style={{ position: "relative" }}
      direction={isDesktop ? "row" : "column"}
    >
      <Sidebar />
      <InstagramSidebar />
      <Button
        icon={<Up />}
        onClick={() => {
          document
            .getElementById("landing-container")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </Box>
  );
};

export default ActionPanel;
