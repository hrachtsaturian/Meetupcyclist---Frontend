import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import LocationReviewRating from "./LocationReviewRating";

const LocationReviewForm = ({
  newReviewRate,
  newReviewText,
  setNewReviewText,
  setNewReviewRate,
  handleCreateReview,
}) => {
  return (
    <Form onSubmit={handleCreateReview}>
      <FormGroup>
        <Label for="newreview">New Review</Label>
        <div style={{ display: "flex", gap: "12px" }}>
          <div>
            <Input
              id="newreview"
              name="text"
              type="textarea"
              value={newReviewText}
              style={{ width: "500px", border: "1px solid #ccc" }}
              onChange={(e) => setNewReviewText(e.target.value)}
            />
            <LocationReviewRating
              rating={newReviewRate}
              setReviewRate={setNewReviewRate}
              isMuted={false}
            />
          </div>
          <div>
            <Button
              color="warning"
              className="yellow-button"
              // !0
              disabled={!newReviewText?.trim() || !newReviewRate}
            >
              Submit
            </Button>
          </div>
        </div>
      </FormGroup>
    </Form>
  );
};

export default LocationReviewForm;
