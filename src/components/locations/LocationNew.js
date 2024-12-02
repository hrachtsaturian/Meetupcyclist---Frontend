import React, { useState } from "react";
import { Form, Button, Col, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import LocationsAPI from "../../api/LocationsAPI";

const LocationNew = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
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
      await LocationsAPI.create(formData);
      navigate("/locations");
    } catch (error) {
      console.log(error);
      setError(error || "Failed to create location");
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="text-center mb-4">New Location</h3>
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
      <FormGroup row>
        <Label for="exampleAddress" sm={2}>
          Address
        </Label>
        <Col sm={10}>
          <Input
            id="exampleAddress"
            name="address"
            placeholder="address"
            type="text"
            value={formData.address}
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

export default LocationNew;
