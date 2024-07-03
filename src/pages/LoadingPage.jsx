import React from "react";
import { Spinner } from "@chakra-ui/react";
function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        sx={{
          width: "100px",
          height: "100px",
        }}
      />{" "}
    </div>
  );
}

export default LoadingPage;
