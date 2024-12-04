import React, { useState } from "react";
import { Form, Button, Col, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import EventsAPI from "../../api/EventsAPI";

const EventNew = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
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
      const newEvent = await EventsAPI.create(formData);
      navigate(`/events/${newEvent.id}`);
    } catch (error) {
      console.log(error);
      setError(error || "Failed to create event");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="text-center mb-4">New Event</h3>
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
            placeholder="description"
            type="text"
            value={formData.description}
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
      <FormGroup row>
        <Label for="exampleDate" sm={2}>
          Date
        </Label>
        <Col sm={2}>
          <DatePicker
            id="datePicker"
            selected={formData.date}
            onChange={(date) =>
              handleChange({ target: { name: "date", value: date } })
            }
            minDate={new Date()}
            showTimeSelect
            dateFormat="Pp"
            className="form-control"
            autoComplete="off"
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

export default EventNew;
