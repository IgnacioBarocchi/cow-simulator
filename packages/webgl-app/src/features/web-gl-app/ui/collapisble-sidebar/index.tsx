import { Box, Collapsible, Text } from "@mono/ui";

import Button from "../button";
import { Close } from "grommet-icons";
// import { block } from "million/react";
import { useState } from "react";

const CollapsibleSidebar = /*block*/ ({ icon, Content, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button icon={icon} onClick={() => setOpen(!open)} />
      <Collapsible direction="horizontal" open={open}>
        <Box width="medium" pad="medium" align="start">
          <Box direction="row" justify="between" width="100%">
            <Text weight="bold">{title}</Text>
            <Button icon={<Close />} onClick={() => setOpen(false)} />
          </Box>
          <Content />
        </Box>
      </Collapsible>
    </>
  );
};

export default CollapsibleSidebar;
