import React, { useContext, useState } from "react";
import GroupsAPI from "../../api/GroupsAPI";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import GroupIcon from "../../images/group_icon_default.png";
import Context from "../Context";

const JoinedGroupCard = ({ joinedGroup, getJoinedGroups, setError }) => {
  const { currentUser } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  const handleLeave = async (e) => {
    e.preventDefault(); // Prevent navigation due to card link
    setIsLoading(true);
    try {
      await GroupsAPI.leave(joinedGroup.id);
      await getJoinedGroups();
    } catch (e) {
      setError(e?.message || "Error leaving the group");
    }
    setIsLoading(false);
  };

  const isGroupAdmin = joinedGroup.createdBy === currentUser.id;

  return (
    <Card
      style={{
        width: "18rem",
      }}
      tag={Link}
      to={`/groups/${joinedGroup.id}`}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          alt="group-main-photo"
          src={joinedGroup.pfpUrl || GroupIcon}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
          }}
        />
      </div>
      <CardBody>
        <CardTitle className="fs-4">{joinedGroup.name}</CardTitle>
        <CardSubtitle>
          Founder: {joinedGroup.firstName} {joinedGroup.lastName}
        </CardSubtitle>
        {!isGroupAdmin && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button
              color="warning"
              className="yellow-button"
              disabled={isLoading}
              onClick={handleLeave}
            >
              Leave
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default JoinedGroupCard;
