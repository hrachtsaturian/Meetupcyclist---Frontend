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

const FavoriteRow = ({ favorite }) => {
  return (
    <Link to="/something">
      <Card
        style={{
          width: "18rem",
        }}
      >
        <img alt="Sample" src="https://picsum.photos/300/200" />
        <CardBody>
          <CardTitle tag="h5">{favorite.title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {formatData(favorite.date)}
          </CardSubtitle>
          <CardText>{favorite.description}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </Link>
  );
};

export default FavoriteRow;
