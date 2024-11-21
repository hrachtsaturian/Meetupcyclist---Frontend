import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UsersAPI from "../../api/UsersAPI";
import Context from "../Context";
import Loader from "../Loader";
import { Button, Col } from "reactstrap";
import { formatData } from "../../helpers/helpers";

const Profile = () => {
  const { id } = useParams();
  const { currentUser } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const res = await UsersAPI.get(id);
        setUser(res);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    getData();
  }, [id]);

  if (error) {
    return (
      <div class="alert alert-danger" role="alert">
        {error || "Failed to find user info"}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  let sameUser = currentUser.id === user.id;

  return (
    <>
      <h3 className="text-center mb-4">Profile</h3>
      <div className="user-header">
        <img src={user.pfpUrl} alt="profile-picture" />
        <h5>
          {user.firstName} {user.lastName}
        </h5>
        <p>{user.bio}</p>
        <h6>Member since: {formatData(user.createdAt)}</h6>
        {sameUser ? (
          <Link to={`/users/${currentUser.id}/edit`}>
            <Col>
              <Button>Edit</Button>
            </Col>
          </Link>
        ) : null}
      </div>
    </>
  );
};

export default Profile;
