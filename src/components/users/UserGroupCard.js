import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import GroupIcon from "../../images/group_icon_default.png";

const UserGroupCard = ({ group }) => {
  return (
    <Card
      style={{
        width: "500px",
      }}
      tag={Link}
      to={`/groups/${group.id}`}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          alt="group-main-photo"
          src={group.pfpUrl || GroupIcon}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
          }}
        />
        <CardBody>
          <CardTitle className="fs-5">{group.name}</CardTitle>
          <CardSubtitle className="fs-6">{`Members: ${group.membersCount}`}</CardSubtitle>
        </CardBody>
      </div>
    </Card>
  );
};

export default UserGroupCard;
