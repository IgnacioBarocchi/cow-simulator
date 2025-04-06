import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Paragraph,
  CardFooter,
  Box,
  Image,
  Accordion,
  AccordionPanel,
} from "grommet";
import { FC } from "react";

interface GeoRecord {
  fullAddress: string;
  number: number;
  placeType: "PPL" | "CPM";
  provider: string;
  shortAddress: string;
  mapLink: string;
  zone: number;
  commune: number;
  recordKey: number;
}

const RecordImage: FC<Pick<GeoRecord, "placeType">> = ({ placeType }) => {
  const url =
    placeType === "CPM"
      ? "https://placehold.co/600x400"
      : "https://placehold.co/600x400";

  return (
    <Box height="small" width="small" round="full" overflow="hidden">
      <Image fit="cover" src={url} />
    </Box>
  );
};

export interface GeoRecordCardProps extends GeoRecord {
  observations: string;
  rating: number;
}

export const GeoRecordCard: FC<GeoRecordCardProps> = ({
  fullAddress,
  number,
  placeType,
  provider,
  shortAddress,
  mapLink,
  zone,
  commune,
  recordKey,
  observations,
  rating,
}) => {
  return (
    <Card>
      <CardHeader pad="medium" direction="row" align="center" gap="medium">
        <Heading level={2} margin="none" fill={true}>
          {fullAddress}
        </Heading>
      </CardHeader>
      <CardBody pad="medium">
        <Box direction="row" gap="medium">
          <RecordImage placeType={placeType} />
          <Box>
            <Paragraph>
              <strong>Short Address:</strong> {shortAddress}
            </Paragraph>
            <Paragraph>
              <strong>Map Link:</strong>{" "}
              <a href={mapLink} target="_blank" rel="noopener noreferrer">
                {mapLink}
              </a>
            </Paragraph>
            <Paragraph>
              <strong>Rating:</strong> {rating}
            </Paragraph>
          </Box>
        </Box>

        {observations && (
          <Accordion>
            <AccordionPanel label="Observations">
              <CardBody pad="medium">
                <Paragraph>{observations}</Paragraph>
              </CardBody>
            </AccordionPanel>
          </Accordion>
        )}
        <Accordion>
          <AccordionPanel label="Geo info">
            <CardBody pad="medium">
              <Paragraph>
                <strong>Zone:</strong> {zone}
              </Paragraph>
              <Paragraph>
                <strong>Commune:</strong> {commune}
              </Paragraph>
            </CardBody>
          </AccordionPanel>
        </Accordion>
        <Accordion>
          <AccordionPanel label="Details">
            <CardBody pad="medium">
              <Paragraph>
                <strong>Number:</strong> {number}
              </Paragraph>
              <Paragraph>
                <strong>Provider:</strong> {provider}
              </Paragraph>
              <Paragraph>
                <strong>clave:</strong> {recordKey}
              </Paragraph>
            </CardBody>
          </AccordionPanel>
        </Accordion>
      </CardBody>
      <CardFooter pad="medium" background="background-contrast">
        <Box direction="row" gap="medium">
          <Paragraph>
            <strong>Tipo:</strong> {placeType}
          </Paragraph>
          <Paragraph>
            <strong>Proveedor:</strong> {provider}
          </Paragraph>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default GeoRecordCard;
