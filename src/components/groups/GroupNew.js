import React, { useState } from "react";
import { Form, Button, Col, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import GroupsAPI from "../../api/GroupsAPI";

const GroupNew = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
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
      await GroupsAPI.create(formData);
      navigate("/groups");
    } catch (error) {
      console.log(error);
      setError(error || "Failed to create group");
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="text-center mb-4">New Group</h3>
      <FormGroup row>
        <Label for="exampleName" sm={2}>
          Name
        </Label>
        <Col sm={10}>
          <Input
            id="exampleName"
            name="name"
            placeholder="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleDescription" sm={2}>
          Description
        </Label>
        <Col sm={10}>
          <Input
            id="exampleDescription"
            name="description"
            placeholder="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <Button>Submit</Button>
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </Form>
  );
};

export default GroupNew;
