import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersAPI from "../../api/UsersAPI";
import { Form, Button, Col, FormGroup, Input, Label } from "reactstrap";

const Login = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const { user, token} = await UsersAPI.login(formData);
      onAuthSuccess(user, token);
      navigate("/");
    } catch (e) {
      setError(e?.message || "Failed to login in");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="loginPage">
      <Form onSubmit={handleSubmit} className="loginForm">
        <h3
          style={{ fontSize: "40px" }}
          className="text-center mb-2 meetupcyclist"
        >
          Log In
        </h3>
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

export default Login;
