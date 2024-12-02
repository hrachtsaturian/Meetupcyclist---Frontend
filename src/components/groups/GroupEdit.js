import React, { useContext, useEffect, useState } from "react";
import GroupsAPI from "../../api/GroupsAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import Context from "../Context";

const GroupEdit = () => {
  const { id } = useParams();
  const { currentUser } = useContext(Context);

  const [formData, setFormData] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  // first, find the group data
  useEffect(() => {
    async function getData() {
      try {
        const { name, description, createdBy } = await GroupsAPI.get(id);

        if (currentUser.id !== createdBy) {
          navigate("/");
        }

        setFormData({
          name,
          description
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
      await GroupsAPI.update(id, formData);
      navigate(`/groups/${id}`);
    } catch (error) {
      setError(error || "Failed to update group");
      setIsSuccess(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="text-center mb-4">Group Update</h3>
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

export default GroupEdit;
