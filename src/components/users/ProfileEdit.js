import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersAPI from "../../api/UsersAPI";
import Context from "../Context";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import { uploadImage } from "../../helpers/helpers";

const ProfileEdit = () => {
  const { currentUser = {}, setCurrentUser } = useContext(Context);

  const [formData, setFormData] = useState({});
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

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
        { ...formData, pfpUrl: isImageRemoved ? '' : formData.pfpUrl }
      );
      setCurrentUser(updatedUser);
      navigate(`/users/${currentUser.id}`);
    } catch (error) {
      setError(error?.message || 'Failed to update profile');
      setIsSuccess(false);
    }
  };

  const handleUploadImage = async (e) => {
    await uploadImage(e, setFormData, setError);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3 style={{ fontSize: "40px" }} className="text-center mb-2 meetupcyclist">Profile Update</h3>
      <hr></hr>
      <FormGroup row style={{ paddingTop: "40px" }}>
        <Label for="exampleFirstName" sm={2}>
          First Name
        </Label>
        <Col sm={10}>
          <Input
            id="exampleFirstName"
            name="firstName"
            placeholder="John"
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
            placeholder="Doe"
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
            placeholder="example@email.com"
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
            placeholder="********"
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
        <Col sm={7}>
          <Input
            id="imageFile"
            name="imageFile"
            type="file"
            disabled={isImageRemoved}
            onChange={handleUploadImage}
          />
        </Col>
        <Col sm={3}>
          <FormGroup
            check
            inline
          >
            <Input type="checkbox" onChange={(e) => setIsImageRemoved(e.target.checked)} />
            <Label check>
              Remove Image
            </Label>
          </FormGroup>
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
            placeholder="Tell us a little about yourself..."
            value={formData.bio}
            onChange={handleChange}
          />
        </Col>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button color="warning" className="yellow-button">
              Save changes
            </Button>
        </div>
      </FormGroup>
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
