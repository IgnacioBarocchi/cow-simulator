import {
  Box,
  CopyButton,
  Favorite,
  InfoCollapsible,
  Text,
  Ticket,
} from "@mono/ui";

const aliases = ["ignacio.choker"];
const Donate = () => {
  return (
    <InfoCollapsible Icon={Ticket}>
      <Box pad="small" gap="small">
        <Text color="light-2">¿Querés hacer un aporte?</Text>
        {aliases.map((alias) => (
          <Box key={alias} direction="row" align="center" gap="small">
            <CopyButton
              textToCopy={alias}
              label={alias}
              NotificationIcon={Favorite}
              title={`Alias copiado ${alias}`}
              message={
                <Text>
                  ir a{" "}
                  <a href="https://mercadopago.com.ar" target="_blank">
                    Mercado pago
                  </a>
                </Text>
              }
            />
          </Box>
        ))}
      </Box>
    </InfoCollapsible>
  );
};

export default Donate;
