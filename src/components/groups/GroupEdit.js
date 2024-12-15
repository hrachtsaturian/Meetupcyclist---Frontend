import React, { useContext, useEffect, useState } from "react";
import GroupsAPI from "../../api/GroupsAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import Context from "../Context";
import Loader from "../Loader";
import { uploadImage } from "../../helpers/helpers";

const GroupEdit = () => {
  const { id } = useParams();
  const { currentUser } = useContext(Context);

  const [formData, setFormData] = useState({});
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  // first, find the group data
  useEffect(() => {
    const getData = async () => {
      try {
        const { name, description, pfpUrl, createdBy } = await GroupsAPI.get(id);

        if (currentUser.id !== createdBy && !currentUser.isAdmin) {
          navigate("/");
        }

        setFormData({
          name,
          description,
          pfpUrl
        });
        setIsLoading(false);
      } catch (error) {
        setError(error?.message);
      }
    }
    if (id) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await GroupsAPI.update(id, { ...formData, pfpUrl: isImageRemoved ? '' : formData.pfpUrl });
      navigate(`/groups/${id}`);
    } catch (error) {
      setError(error?.message || "Failed to update group");
      setIsSuccess(false);
    }
  };

  const handleUploadImage = async (e) => {
    await uploadImage(e, setFormData, setError);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h3 style={{ fontSize: "40px" }} className="text-center mb-2 meetupcyclist">Group Update</h3>
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

export default GroupEdit;
