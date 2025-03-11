import { Box, Skeleton } from "@mono/ui";
import { Suspense, lazy } from "react";

import Background from "./components/background";
import Donate from "./components/donate";
import InstagramAccounts from "./components/intragram-accounts";

const Contents = lazy(() => import("./components/contents"));

const Skeletons = () => (
  <Box gap="medium" margin={{ top: "large" }}>
    <Skeleton
      style={{ background: "#444444" }}
      width="large"
      height="xsmall"
      round="xsmall"
    />
    <Skeleton
      style={{ background: "#444444" }}
      width="large"
      height="xxsmall"
      round="xsmall"
    />
    <Box direction="row" justify="center" gap="large">
      <Skeleton
        style={{ background: "#444444" }}
        width="xsmall"
        height="xxsmall"
        round="xsmall"
      />
      <Skeleton
        style={{ background: "#444444" }}
        width="xsmall"
        height="xxsmall"
        round="xsmall"
      />
    </Box>
  </Box>
);
export default function LandingPage({ scrollToSimulation }) {
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
        direction="row"
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
