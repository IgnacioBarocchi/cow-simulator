import CollapsibleSidebar from "../collapisble-sidebar";
import { Instagram } from "grommet-icons";
import { Text } from "@mono/ui";

const InstagramLinks = () => (
  <>
    <Text margin={{ top: "small" }}>
      <a href="https://instagram.com/intervencion_v" target="_blank">
        @intervencion_v
      </a>
    </Text>
    <Text margin={{ top: "small" }}>
      <a href="https://instagram.com/santuariosalvajes" target="_blank">
        @santuariosalvajes
      </a>
    </Text>
    <Text>
      <a href="https://www.instagram.com/ignacio_barocchi" target="_blank">
        @ignacio_barocchi
      </a>
    </Text>
  </>
);

const InstagramSidebar = () => {
  return (
    <CollapsibleSidebar
      icon={<Instagram color="#DADADA" />}
      title="Instagram"
      Content={InstagramLinks}
    />
  );
};

export default InstagramSidebar;
