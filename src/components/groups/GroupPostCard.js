import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import ProfileIcon from "../../images/profile_icon_default.png";
import { formatDate } from "../../helpers/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GroupsAPI from "../../api/GroupsAPI";
import Context from "../Context";

const GroupPostCard = ({ post, getPosts }) => {
  const { currentUser } = useContext(Context);

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postText, setPostText] = useState(post.text);
  const [error, setError] = useState();

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault(); // Prevent navigation due to card link
    setIsSubmitting(true);
    try {
      await GroupsAPI.editPost(post.id, postText);
      await getPosts();
      setIsEditing(false);
    } catch (e) {
      setError(e?.message || "Error editing the post");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    try {
      await GroupsAPI.deletePost(post.id);
      await getPosts();
    } catch (e) {
      setError(e?.message || "Error deleting the post");
    }
  };

  const showInput = () => {
    return (
      <Form onSubmit={handleSubmitEdit}>
        <FormGroup>
          <div style={{ display: "flex", gap: "8px" }}>
            <Input
              id="editpost"
              name="text"
              type="textarea"
              value={postText}
              style={{ border: "1px solid #ccc" }}
              onChange={(e) => setPostText(e.target.value)}
            />
            <div>
              <Button
                color="warning"
                className="yellow-button"
                disabled={!postText?.trim() || isSubmitting}
              >
                Submit
              </Button>
            </div>
          </div>
        </FormGroup>
      </Form>
    );
  };

  const userFullName = `${post.firstName} ${post.lastName}`;
  const displayName =
    post.userId === post.groupAdmin
      ? `${userFullName} (Group Admin)`
      : userFullName;
  const displayText = isEditing ? showInput() : post.text;
  const displayDate = `${formatDate(post.createdAt)}${
    post.updatedAt ? " (edited)" : ""
  }`;

  return (
    <Card className="my-2" style={{ width: "600px" }}>
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
          <hr></hr>
          <CardTitle className="fs-5">{displayText}</CardTitle>
          <hr></hr>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <CardText className="fs-6 text-muted">{displayDate}</CardText>
            <div style={{ display: "flex", gap: "8px" }}>
              {currentUser.id === post.userId && (
                <div
                  id={`editPostIcon-${post.id}`}
                  className="icon-wrapper"
                  style={{
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                  onClick={toggleEditMode}
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="fa-xl" />
                  <UncontrolledTooltip
                    placement="top"
                    target={`editPostIcon-${post.id}`}
                  >
                    Edit
                  </UncontrolledTooltip>
                </div>
              )}
              {/* either createdBy, or isAdmin, or group creator can delete */}
              {(currentUser.id === post.userId ||
                currentUser.isAdmin ||
                currentUser.id === post.createdBy) && (
                <div
                  id={`deletePostIcon-${post.id}`}
                  className="icon-wrapper"
                  style={{
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon icon={faTrash} className="fa-xl" />
                  <UncontrolledTooltip
                    placement="top"
                    target={`deletePostIcon-${post.id}`}
                  >
                    Delete
                  </UncontrolledTooltip>
                </div>
              )}
            </div>
          </div>
          {error && (
            <div
              className="alert alert-danger"
              role="alert"
              style={{ marginTop: "10px" }}
            >
              {error}
            </div>
          )}
        </CardBody>
      </div>
    </Card>
  );
};

export default GroupPostCard;
