import { GeoJSON, LayerGroup, LayersControl, useMap } from "react-leaflet";
import { PathOptions } from "leaflet";
import { FC, Suspense, useEffect, useMemo, useState } from "react";
import { colors } from "../../../../constants/colors";
import { Feature, FeatureCollection } from "../../data/geo-types";

const getStreetLine = (feature: Feature, zoom: number): PathOptions => {
  const near = zoom <= 19 && zoom >= 17;
  const medium = zoom <= 16 && zoom >= 15;
  const far = zoom <= 14 && zoom >= 13;
  const weight = far ? 2 : medium ? 4 : near ? 5 : 1;
  // console.log(weight);
  const streetType = feature.properties.tipo_c;
  const style = {
    AVENIDA: { weight: weight * 2, color: colors.avenues },
    CALLE: { weight, color: colors.streets },
    PASAJE: { weight, color: colors.streets },
    BOULEVARD: { weight, color: colors.streets },
    SENDERO: { weight, color: colors.streets },
    AUTOPISTA: { weight, color: colors.streets },
    "ENLACE AUTOPISTA": { weight, color: colors.streets },
  }[streetType];

  return style;
};

interface StreetMapLayerProps {
  streetMapData: FeatureCollection;
  name: string;
}

const Layer: FC<StreetMapLayerProps> = ({ streetMapData, name }) => {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    const onZoomEnd = () => {
      setZoom(map.getZoom());
    };

    map.on("zoomend", onZoomEnd);
    return () => {
      map.off("zoomend", onZoomEnd);
    };
  }, [map]);

  const style = useMemo(() => {
    return (feature: Feature) => getStreetLine(feature, zoom);
  }, [zoom]);

  return (
    <LayersControl.Overlay name={name}>
      <LayerGroup>
        <Suspense fallback={<div>{name}</div>}>
          <GeoJSON data={streetMapData} style={style} />
        </Suspense>
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

export const StreetMap = {
  Layer,
};
