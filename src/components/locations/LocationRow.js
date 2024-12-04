import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardText } from "reactstrap";


const LocationRow = ({ location }) => {
  return (
    <Card className="my-2" tag={Link} to={`/locations/${location.id}`}>
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
            <medium className="text-muted fs-3">{location.name}</medium>
          </b>
        </CardText>
        <hr></hr>
        <CardText>
          <small className="text-muted">
            Created by: {location.firstName} {location.lastName}
          </small>
        </CardText>
        <CardText>
          <small className="text-muted">
            is saved: {String(location.isSaved)}
          </small>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default LocationRow;
