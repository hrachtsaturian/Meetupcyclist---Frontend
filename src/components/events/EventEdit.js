import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventsAPI from "../../api/EventsAPI";
import DatePicker from "react-datepicker";
import Context from "../Context";
import Loader from "../Loader";
import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import { uploadImage } from "../../helpers/helpers";

const EventEdit = () => {
  const { id } = useParams();
  const { currentUser } = useContext(Context);

  const [formData, setFormData] = useState({});
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  // first, find the event data
  useEffect(() => {
    async function getData() {
      try {
        const { title, description, date, location, pfpUrl, createdBy } =
          await EventsAPI.get(id);

        if (currentUser.id !== createdBy && !currentUser.isAdmin) {
          navigate("/");
        }

        setFormData({
          title,
          description,
          date,
          location,
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
      await EventsAPI.update(id, { ...formData, pfpUrl: isImageRemoved ? '' : formData.pfpUrl });
      navigate(`/events/${id}`);
    } catch (error) {
      setError(error?.message || "Failed to update event");
      setIsSuccess(false);
    }
  };

  const handleUploadImage = async (e) => {
    await uploadImage(e, setFormData, setError);
  };

  if (isLoading) {
    return <Loader />;
  }

  const maxTime = new Date();
  maxTime.setHours(23);
  maxTime.setMinutes(59);
  maxTime.setSeconds(59);

  return (
    <Form onSubmit={handleSubmit}>
      <h3 style={{ fontSize: "40px" }} className="text-center mb-2 meetupcyclist">Event Update</h3>
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
      </FormGroup>
      <FormGroup row>
        <Label for="exampleLocation" sm={2}>
          Location
        </Label>
        <Col sm={10}>
          <Input
            id="exampleLocation"
            name="location"
            placeholder="Neptune's Net, Malibu"
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
            selected={formData.date ? new Date(formData.date) : null}
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
        <div style={{ paddingTop: "20px" }}>
          <Col>
            <Button color="warning" className="yellow-button">
              Save changes
            </Button>
          </Col>
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

export default EventEdit;
