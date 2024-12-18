import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Col, FormGroup, Input, Label, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import EventsAPI from "../../api/EventsAPI";
import GroupsAPI from "../../api/GroupsAPI";
import { uploadImage } from "../../helpers/helpers";

const EventNew = () => {
  const { id: groupId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    pfpUrl: "",
  });
  const [groupToLink, setGroupToLink] = useState();
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
      const newEvent = await EventsAPI.create(formData);
      if (groupToLink) {
        await GroupsAPI.linkEvent(groupToLink.id, newEvent.id);
      }
      navigate(`/events/${newEvent.id}`);
    } catch (e) {
      setError(e?.message || "Failed to create event");
    }
    setIsSubmitting(false);
  };

  const handleUploadImage = async (e) => {
    await uploadImage(e, setFormData, setError);
  };

  useEffect(() => {
    const getGroup = async () => {
      try {
        const group = await GroupsAPI.get(groupId);
        setGroupToLink(group);
      } catch (e) {
        // silent error
      }
    };

    if (groupId) {
      getGroup();
    }
  }, [groupId]);

  return (
    <Form onSubmit={handleSubmit} className="container">
      <h3
        style={{ fontSize: "40px" }}
        className="text-center mb-2 meetupcyclist"
      >
        New Event
      </h3>
      <hr></hr>
      <FormGroup row style={{ paddingTop: "40px" }}>
        <Label for="exampleTitle" sm={2}>
          Title
        </Label>
        <Col sm={10}>
          <Input
            id="exampleTitle"
            name="title"
            placeholder="Morning Bike Ride Meetup"
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
            placeholder="Join us for a fun and refreshing morning bike ride around the city."
            type="text"
            value={formData.description}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="examplePfpUrl" sm={2}>
          Event Main Photo
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
        <Label for="exampleLocation" sm={2}>
          Location
        </Label>
        <Col sm={10}>
          <Input
            id="exampleLocation"
            name="location"
            placeholder="Use exact location"
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
        <Col sm={2} style={{ width: '300px'}}>
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
            timeIntervals={15}
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
            Submit
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

export default EventNew;
