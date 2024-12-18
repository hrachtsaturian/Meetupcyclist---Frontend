import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  UncontrolledTooltip,
} from "reactstrap";
import ProfileIcon from "../../images/profile_icon_default.png";
import { formatDate } from "../../helpers/helpers";

const RecentPostCard = ({ post }) => {
  const userFullName = `${post.firstName} ${post.lastName}`;
  const displayName =
    post.userId === post.groupAdmin
      ? `${userFullName} (Group Admin)`
      : userFullName;
  const displayGroupName = post.groupName;
  const displayText = post.text;
  const displayDate = `${formatDate(post.createdAt)}${
    post.updatedAt ? " (edited)" : ""
  }`;

  return (
    <Card style={{ width: "500px" }}>
      <div style={{ display: "flex" }}>
        <Link
          to={`/users/${post.userId}`}
          style={{
            padding: "8px",
          }}
        >
          <img
            src={post.pfpUrl || ProfileIcon}
            alt="profile-photo"
            className="rounded-circle"
            id={`user-${post.id}`}
            style={{
              width: "60px",
              height: "60px",
              cursor: "pointer",
              border: "2px solid #ccc",
            }}
          />
          <UncontrolledTooltip placement="top" target={`user-${post.id}`}>
            {post.firstName} {post.lastName}
          </UncontrolledTooltip>
        </Link>
        <CardBody style={{ position: "relative", textAlign: "left" }}>
          <CardTitle className="fs-6">{displayName}</CardTitle>
          <CardSubtitle>
            Group:{" "}
            <Link to={`/groups/${post.groupId}`}>
              <b>
                <i>{displayGroupName}</i>
              </b>
            </Link>
          </CardSubtitle>
          <hr></hr>
          <CardTitle className="fs-5">{displayText}</CardTitle>
          <hr></hr>
          <CardText className="fs-6 text-muted">{displayDate}</CardText>
        </CardBody>
      </div>
    </Card>
  );
};

export default RecentPostCard;
