import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

const SaveLocationCard = ({ location }) => {
  return (
    <Card
      style={{
        width: "18rem",
      }}
      tag={Link}
      to={`/locations/${location.id}`}
    >
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5">{location.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {location.address}
        </CardSubtitle>
        <CardText>{location.description}</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
};

export default SaveLocationCard;
