import React, { useState } from "react";
import GroupsAPI from "../../api/GroupsAPI";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  UncontrolledTooltip,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faRegularBookmark } from "@fortawesome/free-regular-svg-icons";
import GroupIcon from "../../images/group_icon_default.png";

const EventRow = ({ group }) => {
  const [isSaved, setIsSaved] = useState(group.isSaved);
  const [error, setError] = useState(null);

  const toggleSave = async () => {
    try {
      if (isSaved) {
        setIsSaved(false); // optimistic update
        await GroupsAPI.removeSave(group.id); // Unsave the group
      } else {
        setIsSaved(true);
        await GroupsAPI.makeSave(group.id); // Save the group
      }
    } catch (e) {
      setError(e?.message || "Failed to save/unsave group");
      setIsSaved((prev) => !prev); // revert
    }
  };

  return (
    <Card
      className="my-2"
      tag={Link}
      to={`/groups/${group.id}`}
      style={{ width: "700px" }}
    >
      <div style={{ display: "flex" }}>
        <CardImg
          alt="group-main-photo"
          src={group.pfpUrl || GroupIcon}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
          }}
        />
        <CardBody>
          <CardTitle className="fs-4">{group.name}</CardTitle>
          <CardSubtitle>
            Founder: {group.firstName} {group.lastName}
          </CardSubtitle>
          <hr></hr>
          <CardSubtitle>Members: {group.membersCount}</CardSubtitle>
          <div
            id={`saveIcon-${group.id}`}
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation when clicking the icon
              toggleSave();
            }}
          >
            <FontAwesomeIcon
              icon={isSaved ? faSolidBookmark : faRegularBookmark}
              className="fa-xl"
            />
            <UncontrolledTooltip
              placement="top"
              target={`saveIcon-${group.id}`}
            >
              {isSaved ? "Unsave" : "Save"}
            </UncontrolledTooltip>
          </div>
          {error && (
            <div
              className="alert alert-danger"
              role="alert"
              style={{ marginBottom: "20px" }}
            >
              {error}
            </div>
          )}
        </CardBody>
      </div>
    </Card>
  );
};

export default EventRow;
