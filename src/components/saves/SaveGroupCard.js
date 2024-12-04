import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";

const SaveGroupCard = ({ group }) => {
  return (
    <Card
      style={{
        width: "18rem",
      }}
      tag={Link}
      to={`/groups/${group.id}`}
    >
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5">{group.name}</CardTitle>
        <CardText>{group.description}</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
};

export default SaveGroupCard;
