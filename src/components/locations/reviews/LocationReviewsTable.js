import React from "react";
import LocationReviewCard from "./LocationReviewCard";

const LocationReviewsTable = ({ locationReviews, getReviews }) => {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
            }}
        >
            {locationReviews.length === 0 ? (
                <p>Feed is empty at this moment.</p>
            ) : (
                <>
                    {locationReviews.map((locationReview) => (
                        <LocationReviewCard
                            key={locationReview.id}
                            locationReview={locationReview}
                            getReviews={getReviews}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default LocationReviewsTable;
