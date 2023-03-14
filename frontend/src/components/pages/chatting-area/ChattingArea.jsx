import React from "react";
import Display from "./Display";
import TypingArea from "./TypingArea";
import { Navigate } from "react-router-dom";

function ChattingArea() {
  const token = localStorage.getItem("jwt_access_token");
  if (!token && token !== "" && token !== undefined) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      <Display />
      <TypingArea />
    </>
  );
}

export default ChattingArea;
