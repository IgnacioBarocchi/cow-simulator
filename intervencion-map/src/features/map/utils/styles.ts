import { Feature } from "geojson";
// @ts-ignore
import { PathOptions } from "leaflet";
import { colors } from "../../../constants/colors";

const getNeighborhoodStyle = () => {
    return (_feature: Feature): PathOptions => {
        const fillProps = {
            fillOpacity: 1,
            fillColor: "none",
            // colors.fill,
            //: colors.disabled,
        };

        return {
            ...fillProps,
            color: colors.stroke,
            opacity: 1,
            weight: 2,
        };
    };
};

const streetStyles = {
    AVENIDA: { weight: 3, color: colors.avenues },
    CALLE: { weight: 1.5, color: colors.streets },
    PASAJE: { weight: 1.5, color: colors.streets },
    BOULEVARD: { weight: 1.5, color: colors.streets },
    SENDERO: { weight: 1.5, color: colors.streets },
    AUTOPISTA: { weight: 1.5, color: colors.streets },
    "ENLACE AUTOPISTA": { weight: 1.5, color: colors.streets },
};

type streetStyleParams = Feature & { properties: { tipo_c: keyof typeof streetStyles } }

const getStreetsStyle = (feature: streetStyleParams): PathOptions => {
    const streetType = feature.properties.tipo_c;
    return streetStyles[streetType];
};

export { getNeighborhoodStyle, getStreetsStyle }