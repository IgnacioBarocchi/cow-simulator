import { Box } from "grommet";
import InstagramSidebar from "../instagram-collapsible";
import Sidebar from "../info-collapsible";

const ActionPanel = () => {
  return (
    <Box
      align="start"
      justify="start"
      pad="medium"
      style={{ position: "relative" }}
      direction="row"
    >
      <Sidebar />
      <InstagramSidebar />
    </Box>
  );
};

export default ActionPanel;
