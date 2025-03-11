import { InfoCollapsible, Instagram, Text } from "@mono/ui";
import { Endpoints } from "@mono/context";

const InstagramLinks = () => (
  <>
    <Text margin={{ top: "small" }}>
      <a href={Endpoints.intervencionVInstagram} target="_blank">
        @intervencion_v
      </a>
    </Text>
    <Text margin={{ top: "small" }}>
      <a href={Endpoints.santuarioSalvajesInstagram} target="_blank">
        @santuariosalvajes
      </a>
    </Text>
    <Text margin={{ top: "small" }}>
      <a href={Endpoints.ignacioBarocchiInstagram} target="_blank">
        @ignacio_barocchi
      </a>
    </Text>
  </>
);

const InstagramAccounts = () => {
  return (
    <InfoCollapsible Icon={Instagram} direction="vertical">
      <InstagramLinks />
    </InfoCollapsible>
  );
};

export default InstagramAccounts;
