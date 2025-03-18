import { Box, Skeleton } from "@mono/ui";
import { Suspense, lazy } from "react";

import Background from "./components/background";
import Donate from "./components/donate";
import InstagramAccounts from "./components/intragram-accounts";
import { useDevice } from "use-device-react";

const Contents = lazy(() => import("./components/contents"));

const Skeletons = () => (
  <Box gap="medium" margin={{ top: "large" }}>
    <Skeleton
      // @ts-ignore
      style={{ background: "#444444" }}
      width="large"
      height="xsmall"
      round="xsmall"
    />
    <Skeleton
      // @ts-ignore
      style={{ background: "#444444" }}
      width="large"
      height="xxsmall"
      round="xsmall"
    />
    <Box direction="row" justify="center" gap="large">
      <Skeleton
        // @ts-ignore
        style={{ background: "#444444" }}
        width="xsmall"
        height="xxsmall"
        round="xsmall"
      />
      <Skeleton
        // @ts-ignore
        style={{ background: "#444444" }}
        width="xsmall"
        height="xxsmall"
        round="xsmall"
      />
    </Box>
  </Box>
);
 const LandingPage =({ scrollToSimulation }) =>{
  const { isDesktop } = useDevice();

  return (
    <Box
      fill
      style={{
        position: "relative",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <Background />
      <Box height="100vh" align="center" pad="medium">
        <Suspense fallback={<Skeletons />}>
          <Contents scrollToSimulation={scrollToSimulation} />
        </Suspense>
      </Box>
      <Box
        direction={isDesktop ? "row" : "column"}
        margin={{
          bottom: "calc( env(safe-area-inset-bottom) + 100px )",
          right: "medium",
        }}
        style={{ position: "absolute", bottom: "0", right: "0" }}
      >
        <Donate />
        <InstagramAccounts />
      </Box>
    </Box>
  );
}
export default LandingPage