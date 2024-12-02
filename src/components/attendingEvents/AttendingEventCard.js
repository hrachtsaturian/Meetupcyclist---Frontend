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

// TODO: use tag on card!!
const AttendingEventCard = ({ attendingEvent }) => {
  return (
    <Link to="/something">
      <Card
        style={{
          width: "18rem",
        }}
      >
        <img alt="Sample" src="https://picsum.photos/300/200" />
        <CardBody>
          <CardTitle tag="h5">{attendingEvent.title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {formatData(attendingEvent.date)}
          </CardSubtitle>
          <CardText>{attendingEvent.description}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </Link>
  );
};

export default AttendingEventCard;
