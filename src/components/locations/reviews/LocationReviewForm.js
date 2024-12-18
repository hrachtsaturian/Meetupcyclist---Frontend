import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import LocationReviewRating from "./LocationReviewRating";

const LocationReviewForm = ({
  isSubmitting,
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
              style={{
                width: "500px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
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
              disabled={!newReviewText?.trim() || !newReviewRate || isSubmitting}
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
