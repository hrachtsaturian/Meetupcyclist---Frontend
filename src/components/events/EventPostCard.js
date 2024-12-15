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
import EventsAPI from "../../api/EventsAPI";
import Context from "../Context";

const EventPostCard = ({ post, getPosts }) => {
    const { currentUser } = useContext(Context);

    const [isEditing, setIsEditing] = useState(false);
    const [postText, setPostText] = useState(post.text);

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault(); // Prevent navigation due to card link
        try {
            await EventsAPI.editPost(post.id, postText);
            await getPosts();
            setIsEditing(false);
        } catch (error) {
            console.error("Error editing the post:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await EventsAPI.deletePost(post.id);
            await getPosts();
        } catch (error) {
            console.error("Error deleting the post:", error);
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
                                disabled={!postText?.trim()}
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
    const displayName = post.userId === post.eventOrganizer ? `${userFullName} (Event Admin)` : userFullName;
    const displayText = isEditing ? showInput() : post.text;
    const displayDate = `${formatDate(post.createdAt)}${post.updatedAt ? " (edited)" : ""}`;

    return (
        <Card className="my-2">
            <div style={{ display: "flex", width: "600px" }}>
                <Link
                    to={`/users/${post.userId}`}
                    style={{
                        padding: "8px ",
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
                    <UncontrolledTooltip
                        placement="top"
                        target={`user-${post.id}`}
                    >
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
                            {/* either createdBy, or isAdmin, or event creator can delete */}
                            {(currentUser.id === post.userId || currentUser.isAdmin || currentUser.id === post.createdBy) && (
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
                </CardBody>
            </div>
        </Card>
    );
};

export default EventPostCard;
