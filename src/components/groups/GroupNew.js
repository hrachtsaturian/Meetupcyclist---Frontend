import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Col, FormGroup, Input, Label, Button } from "reactstrap";
import GroupsAPI from "../../api/GroupsAPI";
import { uploadImage } from "../../helpers/helpers";

const GroupNew = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pfpUrl: ""
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
      // issue with creating group - name and description are missing
      const newGroup = await GroupsAPI.create(formData);
      navigate(`/groups/${newGroup.id}`);
    } catch (error) {
      console.log(error);
      setError(error?.message || "Failed to create group");
    }
  };

  const handleUploadImage = async (e) => {
    await uploadImage(e, setFormData, setError);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3
        style={{ fontSize: "40px" }}
        className="text-center mb-2 meetupcyclist"
      >
        New Group
      </h3>
      <hr></hr>
      <FormGroup row style={{ paddingTop: "40px" }}>
        <Label for="exampleName" sm={2}>
          Name
        </Label>
        <Col sm={10}>
          <Input
            id="exampleName"
            name="name"
            placeholder="City Cyclists Club"
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
            placeholder="A community of cycling enthusiasts who meet regularly for group rides, events, and discussions about all things cycling. All levels welcome!"
            type="text"
            value={formData.description}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="examplePfpUrl" sm={2}>
          Group Main Photo
        </Label>
        <Col sm={10}>
          <Input
            id="imageFile"
            name="imageFile"
            type="file"
            onChange={handleUploadImage}
          />
        </Col>
        <div style={{ paddingTop: "20px" }}>
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

export default GroupNew;
