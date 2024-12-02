import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersAPI from "../../api/UsersAPI";
import { Form, Button, Col, FormGroup, Input, Label } from "reactstrap";

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const token = await UsersAPI.authenticate(formData);
      await login(token);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error || "Failed to sign in");
    }
  };
  return (
    <div className="loginPage">
      <Form onSubmit={handleSubmit} className="loginForm">
        <h3 className="text-center mb-4">Log In</h3>
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

export default Login;
