import { Box, Spinner, Tab, Tabs } from "@mono/ui";
import { Suspense, lazy } from "react";

const Records = lazy(() => import("./components/records"));
const CreationForm = lazy(() => import("./features/form"));
const MapComponent = lazy(() => import("./features/map"));

const FeatureTabs = () => (
  <Tabs>
    <Tab title="Votación">
      <Suspense fallback={<Spinner />}>
        <Box margin={{ top: "large" }}>
          <CreationForm />
        </Box>
      </Suspense>
    </Tab>
    <Tab title="Flyer"></Tab>
    <Tab title="Mapa">
      <Suspense>
        <Box margin={{ top: "large" }}>
          <MapComponent />
        </Box>
      </Suspense>
    </Tab>
    <Tab title="Registros">
      <Suspense>
        <Box margin={{ top: "large" }}>
          <Records />
        </Box>
      </Suspense>
    </Tab>
  </Tabs>
);

export default FeatureTabs;

/*
import { Box, Spinner, Tab, Tabs } from "@mono/ui";
import { FC, ReactNode, Suspense, lazy } from "react";

const Records = lazy(() => import("./components/records"));
const CreationForm = lazy(() => import("./features/form"));
const MapComponent = lazy(() => import("./features/map"));

const Content: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <Tab title={title}>
      <Suspense fallback={<Spinner />}>
      <Box margin={{ top: "large" }}>{children}</Box>
      </Suspense>
    </Tab>
  );
};

const FeatureTabs = () => (
  <Tabs>
    <Content title="Votación">
      <CreationForm />
    </Content>
    <Content title="Mapa">
      <MapComponent />
    </Content>
    <Content title="Registros">
      <Records />
    </Content>
  </Tabs>
);

export default FeatureTabs;

*/
