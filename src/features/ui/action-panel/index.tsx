import { Box } from "grommet";
import InstagramSidebar from "../instagram-collapsible";
import Sidebar from "../info-collapsible";
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
    </Box>
  );
};

export default ActionPanel;
