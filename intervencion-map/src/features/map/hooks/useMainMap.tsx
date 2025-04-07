import { useEffect, useMemo, useState } from "react";

import { Feature } from "../../../../local/data/geo-types";
import { colors } from "../../../constants/colors";
import { useMap } from "react-leaflet";

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

export default function useMainMap() {
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

  return { style };
}
