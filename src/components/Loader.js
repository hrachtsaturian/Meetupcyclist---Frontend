import React from "react";
import { Card, CardBody } from "reactstrap";

const Loader = () => {
  return (
    <main>
      <Card>
        <CardBody>
          <div className="meetupcyclist"
            style={{
              fontSize: "40px",
              color: "black"
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
