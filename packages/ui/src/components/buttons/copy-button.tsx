import { Button, ButtonProps, Notification, NotificationProps } from "grommet";
import { Copy } from "grommet-icons";
import type { Icon } from "grommet-icons";

import { FC, useState } from "react";

export interface CopyButtonProps {
  textToCopy: string;
  label: ButtonProps["label"];
  title: NotificationProps["title"];
  message: NotificationProps["message"];
  NotificationIcon: Icon;
}

const CopyButton: FC<CopyButtonProps> = ({
  textToCopy,
  title,
  message,
  label,
  NotificationIcon,
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);

    setShowNotification(true);
  };

  return (
    <>
      {showNotification && (
        <Notification
          icon={<NotificationIcon />}
          toast={{
            autoClose: true,
            position: "top-right",
          }}
          global
          title={title}
          message={message}
          onClose={() => {
            setShowNotification(false);
          }}
          // @ts-ignore
          background="dark-1"
        />
      )}
      <Button
        label={label}
        icon={<Copy />}
        onClick={copyToClipboard}
        color="#121212"
        style={{ background: "black", color: "#DADADA" }}
      />
    </>
  );
};

export default CopyButton;
