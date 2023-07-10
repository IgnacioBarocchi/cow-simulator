import { Suspense } from "react";
import CowPen from "./scenarios/CowPen/CowPen";

export default function App() {
  return (
    <>
      <div>{`current scenario {{current scenario value}}`}</div>
      <Suspense
        fallback={
          <div className="fallback-container">
            <div className="loading-message">Loading...</div>
            <div className="spinner"></div>
          </div>
        }
      >
        <CowPen />
      </Suspense>
    </>
  );
}
