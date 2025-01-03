import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import LocationsAPI from "../../api/LocationsAPI";
import Context from "../Context";
import Loader from "../Loader";
import { uploadImage } from "../../helpers/helpers";

const LocationEdit = () => {
  const { id } = useParams();
  const { currentUser } = useContext(Context);

  const [formData, setFormData] = useState({});
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initializeError, setInitializeError] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  // first, find the location data
  useEffect(() => {
    const getData = async () => {
      try {
        const { name, description, address, pfpUrl } = await LocationsAPI.get(
          id
        );

        setFormData({
          name,
          description,
          address,
          pfpUrl,
        });
        setIsLoading(false);
      } catch (e) {
        setInitializeError(e?.message);
      }
    };

    if (!currentUser.isAdmin) {
      return navigate("/");
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
    setIsSubmitting(true);
    try {
      await LocationsAPI.update(id, {
        ...formData,
        pfpUrl: isImageRemoved ? "" : formData.pfpUrl,
      });
      navigate(`/locations/${id}`);
    } catch (e) {
      setError(e?.message || "Failed to update location");
    }
    setIsSubmitting(false);
  };

  if (initializeError) {
    return (
      <div class="alert alert-danger container" role="alert">
        {initializeError}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  const handleUploadImage = async (e) => {
    await uploadImage(e, setFormData, setError);
  };

  return (
    <Form onSubmit={handleSubmit} className="container">
      <h3
        style={{ fontSize: "40px" }}
        className="text-center mb-2 meetupcyclist"
      >
        Location Update
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
          <FormGroup check inline>
            <Input
              type="checkbox"
              value={isImageRemoved}
              onChange={(e) => setIsImageRemoved(e.target.checked)}
            />
            <Label check>Remove Image</Label>
          </FormGroup>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            color="warning"
            className="yellow-button"
            disabled={isSubmitting}
          >
            Save changes
          </Button>
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

export default LocationEdit;
