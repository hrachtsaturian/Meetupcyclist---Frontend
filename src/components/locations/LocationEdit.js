import React, { useContext, useEffect, useState } from "react";
import LocationsAPI from "../../api/LocationsAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import Context from "../Context";
import Loader from "../Loader";

const LocationEdit = () => {
  const { id } = useParams();
  const { currentUser } = useContext(Context);

  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  // first, find the location data
  useEffect(() => {
    async function getData() {
      try {
        const { name, description, address } = await LocationsAPI.get(id);

        setFormData({
          name,
          description,
          address,
        });
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }

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
    try {
      await LocationsAPI.update(id, formData);
      navigate(`/locations/${id}`);
    } catch (error) {
      setError(error || "Failed to update location");
      setIsSuccess(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="text-center mb-4">Location Update</h3>
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
      <FormGroup check row>
        <Col
          sm={{
            offset: 2,
            size: 10,
          }}
        >
          <Button>Save changes</Button>
        </Col>
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

export default LocationEdit;
