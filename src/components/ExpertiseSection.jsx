import React, { useRef } from "react";

const ExpertiseSection = () => {
  const mainRef = useRef(null);

  return (
    <div
      id="main"
      ref={mainRef}
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "black",
        color: "white",
        overflowX: "hidden",
      }}
    >
      <div
        id="page1"
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "skyblue",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <h1
          style={{
            fontSize: "20vw",
            fontWeight: 500,
            color: "black",
            fontFamily: "monument, sans-serif",
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          TECH
        </h1>
      </div>
    </div>
  );
};

export default ExpertiseSection;
