import React, { useContext, useEffect, useState } from "react";
import EventsAPI from "../../api/EventsAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import Context from "../Context";

const EventEdit = () => {
  const { id } = useParams();
  const { currentUser } = useContext(Context);

  const [formData, setFormData] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  // first, find the event data
  useEffect(() => {
    async function getData() {
      try {
        const { title, description, date, location, createdBy } =
          await EventsAPI.get(id);

        if (currentUser.id !== createdBy) {
          navigate("/");
        }

        setFormData({
          title,
          description,
          date,
          location,
        });
      } catch (error) {
        setError(error);
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
      await EventsAPI.update(id, formData);
      navigate(`/events/${id}`);
    } catch (error) {
      setError(error || "Failed to update event");
      setIsSuccess(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="text-center mb-4">Event Update</h3>
      <FormGroup row>
        <Label for="exampleTitle" sm={2}>
          Title
        </Label>
        <Col sm={10}>
          <Input
            id="exampleTitle"
            name="title"
            placeholder="title"
            type="text"
            value={formData.title}
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
            placeholder="description name"
            type="text"
            value={formData.description}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleDate" sm={2}>
          Date
        </Label>
        <Col sm={10}>
          <Input
            id="exampleDate"
            name="date"
            placeholder="date"
            type="text"
            value={formData.date}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleLocation" sm={2}>
          Location
        </Label>
        <Col sm={10}>
          <Input
            id="exampleLocation"
            name="location"
            placeholder="location"
            type="text"
            value={formData.location}
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

export default EventEdit;
