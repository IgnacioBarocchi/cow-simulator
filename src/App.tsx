import { Suspense, useContext, useEffect } from "react";

import { AppContext } from "./containers/context/AppContext";
import { Leva } from "leva";
import Scenario from "./components/Scenario";

export default function App() {
  const { USE_FULL_SCREEN } = useContext(AppContext);

  useEffect(() => {
    if (USE_FULL_SCREEN) {
      const handlePermission = () => {
        const permissionPromise = document.documentElement.requestFullscreen();
        if (permissionPromise) {
          permissionPromise
            .then(() => {})
            .catch((error) => {
              console.error("permission declined:", error);
            });
        }
      };
      document.documentElement.addEventListener("click", handlePermission);
      return () => {
        document.documentElement.removeEventListener("click", handlePermission);
      };
    }
  }, []);

  return (
    <>
      <Leva />
      {/* <div>{`current scenario {{current scenario value}}`}</div> */}
      <Suspense
        fallback={
          <div className="fallback-container">
            <div className="loading-message">Loading...</div>
            <div className="spinner"></div>
          </div>
        }
      >
        <Scenario />
      </Suspense>
    </>
  );
}
