import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";

// TODO: use tag on card??
const JoinedGroupRow = ({ joinedGroup }) => {
  return (
    <Link to="/something">
      <Card
        style={{
          width: "18rem",
        }}
      >
        <img alt="Sample" src="https://picsum.photos/300/200" />
        <CardBody>
          <CardTitle tag="h5">{joinedGroup.name}</CardTitle>
          <CardText>{joinedGroup.description}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </Link>
  );
};

export default JoinedGroupRow;
