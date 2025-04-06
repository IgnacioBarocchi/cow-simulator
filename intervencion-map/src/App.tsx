import "./index.css";

import {
  Anchor,
  Box,
  Button,
  Footer,
  Grommet,
  Image,
  Page,
  PageContent,
  PageHeader,
  Text,
  grommet,
} from "grommet";

import { FC } from "react";
import LoginForm from "./components/login";
import { MainView } from "./main-view";
import { logged } from "./store/store";
import { useAtom } from "jotai";

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

function App() {
  const [userLogged, setUserLogged] = useAtom(logged);

  return (
    <Grommet full theme={grommet} themeMode="dark">
      <Page kind="wide">
        <PageContent background="blue-1">
          {/* <Box flex="grow" pad="small" fill="vertical" gap="medium"> */}
          <PageHeader
            title="Interveción V"
            subtitle={"Registros y mapas de puntos de interés."}
            actions={
              <Button
                label="Salir"
                onClick={() => setUserLogged(false)}
                primary
              />
            }
          />
          {userLogged ? <MainView /> : <LoginForm />}
          {/* </Box> */}
        </PageContent>
        {/* <Footer background="brand" pad="medium">
          <Text>Copyright</Text>
          <Anchor label="About" />
        </Footer> */}
      </Page>
    </Grommet>
  );
}

export default App;
/*
const theme = deepMerge(grommet, {
  global: {
    colors: {
      "background-back": "#33333308",
      "background-front": "#444444",
      "background-contrast": "#FFFFFF18",
      "active-background": "#33333310",
      "active-text": "#f8f8f8",
      "my-text-color": "#FFFFFF",
      "another-color": "rgb(34, 139, 230)",
      brand: "#000000",
      control: {
        dark: "accent-1",
        light: "brand",
      },
      focus: "#FFFFFF",
      "graph-0": "#FFFFFF",
      "graph-1": "#CCCCCC",
      "graph-2": "#AAAAAA",
      "graph-3": "#888888",
      "graph-4": "#666666",
      placeholder: "#AAAAAA",
      selected: "#000000",
      text: "#f8f8f8",
      "text-strong": "#FFFFFF",
      "text-weak": "#CCCCCC",
      "text-xweak": "#BBBBBB",
      icon: "#f8f8f8",
      "selected-background": "#000000",
      "selected-text": "#FFFFFF",
      white: "#FFFFFF",
    },
    font: {
      family: "Arial, sans-serif",
      size: "15px",
      height: "20px",
    },
    control: {
      border: {
        color: "#444444",
        radius: "4px",
        width: "1px",
      },
    },
    active: {
      background: {
        color: "#33333308",
        opacity: "medium",
      },
      color: "#f8f8f8",
    },
    hover: {
      background: {
        color: "#444444",
        opacity: "medium",
      },
      color: "#f8f8f8",
    },
    focus: {
      border: {
        color: "#FFFFFF",
      },
      outline: {
        color: "#000000",
        size: "1px",
      },
      shadow: "5px 5px 5px rgba(255, 255, 255, 0.2)",
    },
    opacity: {
      strong: 0.8,
      medium: 0.4,
      weak: 0.1,
    },
    spacing: "24px",
    size: {
      xxsmall: "48px",
      xsmall: "96px",
      small: "192px",
      medium: "384px",
      large: "768px",
      xlarge: "1152px",
      xxlarge: "1536px",
      full: "100%",
    },
  },
});

const r = {
  fullAddress:
    "5710, Avenida Castañares, Villa Lugano, Buenos Aires, Comuna 8, Ciudad Autónoma de Buenos Aires, C1439ATC, Argentina",
  number: 1,
  placeType: "PPL",
  provider: "Sarmiento",
  shortAddress: "aaa",
  mapLink:
    "https://nominatim.openstreetmap.org/search?q=CIUDAD%20DE%20BUENOS%20AIRES%20AV.%20CASTA%C3%91ARES%205710&format=json",
  zone: 1,
  commune: 8,
  recordKey: 99,
  observations: "",
  rating: 5,
} as GeoRecordCardProps;
<GeoRecordCard {...r} />
*/
// import { useState } from "react";
// // import { deepMerge } from "grommet/utils";
// import GeoRecordCard, { GeoRecordCardProps } from "./components/card";
// parent={<Anchor label="Parent Page" />}
