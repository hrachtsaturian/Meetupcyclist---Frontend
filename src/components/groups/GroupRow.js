import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardText } from "reactstrap";

// TODO: use tag on card??
const EventRow = ({ group }) => {
  return (
    <Card className="my-2">
      <Link to={`${group.id}`}>
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
            <b>
              <medium className="text-muted fs-3">{group.name}</medium>
            </b>
          </CardText>
          <hr></hr>
          <CardText>
            <small className="text-muted">
              Created by: {group.firstName} {group.lastName}
            </small>
          </CardText>
          <CardText>
            <small className="text-muted">
              is favorite: {String(group.isFavorite)}
            </small>
          </CardText>
        </CardBody>
      </Link>
    </Card>
  );
};

export default EventRow;
