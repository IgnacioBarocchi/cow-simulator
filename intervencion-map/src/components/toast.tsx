import { Box, Button, Paragraph } from "grommet";
import { useState } from "react";

export const Toast = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Box>
      {visible && (
        <Notification
          toast
          title="Toast Notification"
          message="This is an example of a toast notification"
          onClose={() => setVisible(false)}
        />
      )}
    </Box>
  );
};
