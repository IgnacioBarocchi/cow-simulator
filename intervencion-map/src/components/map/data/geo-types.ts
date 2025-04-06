export interface CRSProperties {
    name: string;
  }
  
  export interface CRS {
    type: string;
    properties: CRSProperties;
  }
  
  export interface FeatureProperties {
    id: number;
    codigo: number;
    nomoficial: string;
    alt_izqini: number;
    alt_izqfin: number;
    alt_derini: number;
    alt_derfin: number;
    nomanter: string;
    nom_mapa: string;
    tipo_c:
      | "AVENIDA"
      | "CALLE"
      | "PASAJE"
      | "BOULEVARD"
      | "SENDERO"
      | "AUTOPISTA"
      | "ENLACE AUTOPISTA";
    long: number;
    sentido: string;
    cod_sent: number;
    observa: string | null;
    bicisenda: string;
    lado_ciclo: string | null;
    recorrid_x: string | null;
    ciclo_obse: string;
    tooltip_bi: string;
    red_jerarq: string;
    red_tp: string | null;
    ffcc: string | null;
    tipo_ffcc: string | null;
    COMUNA: number;
    COM_PAR: number;
    COM_IMPAR: number;
    BARRIO: string;
    BARRIO_PAR: string;
    BARRIO_IMP: string;
  }
  
  export interface Geometry {
    type: string;
    coordinates: number[][][];
  }
  
  export interface Feature {
    type: string;
    properties: FeatureProperties;
    geometry: Geometry;
  }
  
  export interface FeatureCollection {
    type: string;
    name: string;
    crs: CRS;
    features: Feature[];
  }
  