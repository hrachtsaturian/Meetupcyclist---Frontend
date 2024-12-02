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
import { formatData } from "../../helpers/helpers";

const FavoriteEventCard = ({ event }) => {
  return (
    <Card
      style={{
        width: "18rem",
      }}
      tag={Link}
      to={`/events/${event.id}`}
    >
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5">{event.title}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {formatData(event.date)}
        </CardSubtitle>
        <CardText>{event.description}</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
};

export default FavoriteEventCard;
