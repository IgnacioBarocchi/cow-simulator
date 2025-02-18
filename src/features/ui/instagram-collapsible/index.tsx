import CollapsibleSidebar from "../collapisble-sidebar";
import { Instagram } from "grommet-icons";
import { Text } from "grommet";

const InstagramLinks = () => (
  <>
    <Text margin={{ top: "small" }}>
      <a href="https://instagram.com/intervencion_v">@intervencion_v</a>
    </Text>
    <Text margin={{ top: "small" }}>
      <a href="https://instagram.com/santuariosalvajes">@santuariosalvajes</a>
    </Text>
  </>
);

const InstagramSidebar = () => {
  return (
    <CollapsibleSidebar
      icon={<Instagram />}
      title="Instagram"
      Content={InstagramLinks}
    />
  );
};

export default InstagramSidebar;
