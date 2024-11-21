import React, { useContext, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import UsersAPI from "../../api/UsersAPI";
import Context from "../Context";

const ProfileEdit = () => {
  const { currentUser = {}, setCurrentUser } = useContext(Context);

  const [formData, setFormData] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const { firstName, lastName, email, password, pfpUrl, bio } = currentUser;
    setFormData({
      firstName,
      lastName,
      email,
      password,
      pfpUrl,
      bio
    });
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await UsersAPI.updateProfile(
        currentUser.id,
        formData
      );
      setCurrentUser(updatedUser);
      setIsSuccess(true);
      setError();
    } catch (error) {
      setError(error || 'Failed to update profile');
      setIsSuccess(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="text-center mb-4">Profile</h3>
      <FormGroup row>
        <Label for="exampleFirstName" sm={2}>
          First Name
        </Label>
        <Col sm={10}>
          <Input
            id="exampleFirstName"
            name="firstName"
            placeholder="first name"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleLastName" sm={2}>
          Last Name
        </Label>
        <Col sm={10}>
          <Input
            id="exampleLastName"
            name="lastName"
            placeholder="last name"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleEmail" sm={2}>
          Email
        </Label>
        <Col sm={10}>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="examplePassword" sm={2}>
          Password
        </Label>
        <Col sm={10}>
          <Input
            id="examplePassword"
            name="password"
            placeholder="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="examplePfpUrl" sm={2}>
          Profile Photo
        </Label>
        <Col sm={10}>
          <Input
            id="examplePfpUrl"
            name="pfpUrl"
            placeholder="profile photo url"
            type="text"
            value={formData.pfpUrl}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleText" sm={2}>
          Bio
        </Label>
        <Col sm={10}>
          <Input
            id="exampleText"
            name="bio"
            type="textarea"
            placeholder="tell us something about yourself"
            value={formData.bio}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
          <Button>Save changes</Button>
      {isSuccess && (
          <div class="alert alert-success" role="alert">
            Updated successfully
          </div>
        )}
        {error && (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}
    </Form>
  );
};

export default ProfileEdit;
