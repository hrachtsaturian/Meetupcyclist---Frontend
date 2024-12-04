import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";

const JoinedGroupCard = ({ joinedGroup }) => {
  return (
    <Card
      style={{
        width: "18rem",
      }}
      tag={Link}
      to={`/groups/${joinedGroup.id}`}
    >
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5">{joinedGroup.name}</CardTitle>
        <CardText>{joinedGroup.description}</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
};

export default JoinedGroupCard;
