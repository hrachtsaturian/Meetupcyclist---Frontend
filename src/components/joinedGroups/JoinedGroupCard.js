import React, { useContext } from "react";
import GroupsAPI from "../../api/GroupsAPI";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
} from "reactstrap";
import GroupIcon from "../../images/group_icon_default.png";
import Context from "../Context";

const JoinedGroupCard = ({ joinedGroup, getJoinedGroups, setLoading }) => {
  const { currentUser } = useContext(Context);

  const handleLeave = async (e) => {
    e.preventDefault(); // Prevent navigation due to card link
    setLoading(true);
    try {
      await GroupsAPI.leave(joinedGroup.id);
      await getJoinedGroups();
    } catch (error) {
      console.error("Error leaving the group:", error);
    }
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
      <img
        alt="group-main-photo"
        src={joinedGroup.pfpUrl || GroupIcon}
      />
      <CardBody>
        <CardTitle className="fs-4">{joinedGroup.name}</CardTitle>
        <CardSubtitle>
          Founder: {joinedGroup.firstName} {joinedGroup.lastName}
        </CardSubtitle>
        {!isGroupAdmin && <Col style={{ paddingTop: "10px" }}>
          <Button
            color="warning"
            className="yellow-button"
            onClick={handleLeave}
          >
            Leave
          </Button>
        </Col>}
      </CardBody>
    </Card>
  );
};

export default JoinedGroupCard;
