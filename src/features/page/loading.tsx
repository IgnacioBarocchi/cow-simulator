import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframe animation for the loading spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled component for the overlay

// Styled component for the loading spinner
const Spinner = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-top: 8px solid white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

// Styled component for loading text
const LoadingText = styled.p`
  color: white;
  font-size: 1.5em;
  margin-top: 20px;
`;

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
      <LoadingText>Loading...</LoadingText>
    </div>
  );
};

export default Loading;
