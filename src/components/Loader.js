import React from "react";
import { Card, CardBody } from "reactstrap";

const Loader = () => {
  return (
    <main>
      <Card>
        <CardBody>
          <div
            style={{
              color: "black",
              fontSize: "24px",
            }}
          >
            Loading &hellip;
          </div>
        </CardBody>
      </Card>
    </main>
  );
}

export default Loader;
