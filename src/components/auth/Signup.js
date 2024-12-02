import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersAPI from "../../api/UsersAPI";
import { Form, Button, Col, FormGroup, Input, Label } from "reactstrap";

const Signup = ({ login }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    pfpUrl: "",
    bio: "",
  });
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await UsersAPI.signup(formData);
      login(token);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error || "Failed to sign up");
    }
  };
  return (
    <div className="signupPage">
      <Form onSubmit={handleSubmit} className="signupForm">
        <h3 className="text-center mb-4">Sign Up</h3>
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
              placeholder="profile photo URL"
              type="text"
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
              placeholder="tell us about yourself"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </Form>
    </div>
  );
};

export default Signup;
