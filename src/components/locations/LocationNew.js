import React, { useContext, useState } from "react";
import { Form, Button, Col, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import LocationsAPI from "../../api/LocationsAPI";
import Context from "../Context";
import { uploadImage } from "../../helpers/helpers";

const LocationNew = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    pfpUrl: ""
  });
  const { currentUser } = useContext(Context);
  const [error, setError] = useState();
  const navigate = useNavigate();

  if (!currentUser.isAdmin) {
    return navigate("/");
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // issue with creating location - name and description are missing
      const newLocation = await LocationsAPI.create(formData);
      navigate(`/locations/${newLocation.id}`);
    } catch (error) {
      console.log(error);
      setError(error?.message || "Failed to create location");
    }
  };

  const handleUploadImage = async (e) => {
    await uploadImage(e, setFormData, setError);
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <h3 style={{fontSize: "40px" }} className="text-center mb-2 meetupcyclist">New Location</h3>
      <hr></hr>
      <FormGroup row style={{paddingTop:"40px"}}>
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
          <Label for="examplePfpUrl" sm={2}>
            Location Main Photo
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
        <div style={{paddingTop:"20px"}}>
        <Col>
        <Button color="warning" className="yellow-button">
            Submit
          </Button>
        </Col>
        </div>
      </FormGroup>
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </Form>
  );
};

export default LocationNew;
