import React  from "react";
import GroupsAPI from "../../api/GroupsAPI";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import GroupIcon from "../../images/group_icon_default.png";

const SaveGroupCard = ({ group, getSaves, setLoading }) => {
  const handleUnsave = async (e) => {
    e.preventDefault(); // Prevent navigation due to card link
    setLoading(true);
    try {
      await GroupsAPI.removeSave(group.id);
      await getSaves();
    } catch (error) {
      console.error("Error unsaving the group:", error);
    }
  };

  return (
    <Card
      style={{
        width: "18rem",
      }}
      tag={Link}
      to={`/groups/${group.id}`}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={group.pfpUrl || GroupIcon}
          alt="group-main-photo"
          style={{
            width: '200px',
            height: '200px',
            objectFit: "contain",
          }}
        />
      </div>
      <CardBody>
        <CardTitle className="fs-4">{group.name}</CardTitle>
        <CardSubtitle>
          Founder: {group.firstName} {group.lastName}
        </CardSubtitle>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          {(
            <Button
              color="warning"
              className="yellow-button"
              onClick={handleUnsave}
            >
              Unsave
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default SaveGroupCard;
