import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import { formatData } from "../../helpers/helpers";

const EventRow = ({ event }) => {
  return (
    <Card className="my-2">
      <Link to={`${event.id}`}>
        <CardImg
          alt="Card image cap"
          src="https://picsum.photos/900/180"
          style={{
            height: 180,
          }}
          top
          width="100%"
        />
        <CardBody>
          <CardText>
            <b><medium className="text-muted fs-3">{formatData(event.date)}</medium></b>
          </CardText>
          <CardTitle className="fs-3" tag="h5">{event.title}</CardTitle>
          <hr></hr>
          <CardText>
            <small className="text-muted">
              Created by: {event.firstName} {event.lastName}
            </small>
          </CardText>
          <CardText>
            <small className="text-muted">is favorite: {String(event.isFavorite)}</small>
          </CardText>
        </CardBody>
      </Link>
    </Card>
  );
};

export default EventRow;
