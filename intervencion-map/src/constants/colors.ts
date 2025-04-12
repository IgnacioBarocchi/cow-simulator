export const colors = {
  background: "black",
  avenues: "#758BFD", // "#38414E",
  streets: "#1D232B",
  fill: "#242F3E",
  stroke: "#746855",
  disabled: "#121212",
} as const;

// streets: import.meta.env["VITE_STREETS_GEO_URL_" + import.meta.env.MODE === "development" ? "DEV" : "PROD"],
export const geojsonUrls = import.meta.env.PROD ? {
  vspots: import.meta.env.VITE_INTERVENTION_SPOTS_GEO_URL,
  streets: import.meta.env.VITE_STREETS_GEO_URL_PROD,
  neighborhoods: import.meta.env.VITE_NEIGHBORHOODS_GEO_URL_PROD,
  avenues: import.meta.env.VITE_AVENUES_RECODS_URL_PROD,
} : {
  vspots: import.meta.env.VITE_INTERVENTION_SPOTS_GEO_URL,
  streets: import.meta.env.VITE_STREETS_GEO_URL_DEV,
  neighborhoods: import.meta.env.VITE_NEIGHBORHOODS_GEO_URL_DEV,
  avenues: import.meta.env.VITE_AVENUES_RECODS_URL_DEV,
}

export const user = {
  email: import.meta.env.VITE_EMAIL,
  password: import.meta.env.VITE_PASSWORD
}

export const preset = [
  { option: "PATERNAL" },
  { option: "VILLA CRESPO" },
  { option: "ALMAGRO" },
  { option: "CABALLITO" },
  { option: "FLORES" },
  { option: "FLORESTA" },
  { option: "SAN CRISTOBAL" },
  { option: "PRQ PATRICIOS" },
  { option: "VILLA URQUIZA" },
  { option: "COLEGIALES" },
  { option: "CHACABUCO" },
  { option: "PALERMO" },
  { option: "BELGRANO" },
  { option: "RECOLETA" },
  { option: "NUÑEZ" },
];
// export const colors = {
//   background: "#121212",
//   roads: "#282828",
//   fill: "#1C1C1C",
//   stroke: "#393939",
//   disabled: "#3E3E3E",
// } as const;
