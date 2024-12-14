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


  // do we need loading state to prevent double click?
  const toggleSave = async () => {
    if (isSaved) {
      await GroupsAPI.removeSave(group.id); // Unsave the group
      setIsSaved(false);
    } else {
      await GroupsAPI.makeSave(group.id); // Save the group
      setIsSaved(true);
    }
  };

  return (
    <Card className="my-2" tag={Link} to={`/groups/${group.id}`}>
      <div style={{ display: "flex", width: "700px" }}>
        <CardImg
          alt="group-main-photo"
          src={group.pfpUrl || GroupIcon}
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'contain',
          }}
        />
        <CardBody style={{ position: "relative", textAlign: 'left' }}>
          <CardTitle className="fs-4">{group.name}</CardTitle>
          <CardSubtitle>
            Founder: {group.firstName} {group.lastName}
          </CardSubtitle>
          <hr></hr>
          <CardSubtitle>
            Members: {group.membersCount}
          </CardSubtitle>
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
        </CardBody>
      </div>
    </Card>
  );
};

export default EventRow;
