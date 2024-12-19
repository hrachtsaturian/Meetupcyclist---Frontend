import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersAPI from "../../api/UsersAPI";
import { Form, Button, Col, FormGroup, Input, Label } from "reactstrap";
import { uploadImage } from "../../helpers/helpers";

const Signup = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    pfpUrl: "",
    bio: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { user, token } = await UsersAPI.signup(formData);
      onAuthSuccess(user, token);
      navigate("/");
    } catch (e) {
      setError(e?.message || "Failed to sign up");
    }
    setIsSubmitting(false);
  };

  const handleUploadImage = async (e) => {
    await uploadImage(e, setFormData, setError);
  };

  return (
    <div className="signupPage">
      <Form onSubmit={handleSubmit} className="signupForm">
        <h3
          style={{ fontSize: "40px" }}
          className="text-center mb-2 meetupcyclist"
        >
          Sign Up
        </h3>
        <FormGroup row>
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
          <Col sm={10}>
            <Input
              id="imageFile"
              name="imageFile"
              type="file"
              onChange={handleUploadImage}
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
              placeholder="Tell us a little about yourself..."
              value={formData.bio}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={11}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                color="warning"
                className="yellow-button"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </Col>
        </FormGroup>
        {error && (
          <div
            className="alert alert-danger"
            role="alert"
            style={{ marginTop: "10px" }}
          >
            {error}
          </div>
        )}
      </Form>
    </div>
  );
};

export default Signup;
