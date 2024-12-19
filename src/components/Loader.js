import React from "react";
import { Spinner } from "reactstrap";

const Loader = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      data-testid="loader"
    >
      <Spinner color="warning" style={{ width: "3rem", height: "3rem" }}>
        Loading...
      </Spinner>
    </div>
  );
};

export default Loader;
