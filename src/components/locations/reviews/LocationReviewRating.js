import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const LocationReviewRating = ({
    rating,
    isMuted,
    setReviewRate = () => { },
}) => {
    return (
        <div>
            {[1, 2, 3, 4, 5].map((starIndex) => {
                const ratingValue = starIndex;
                return (
                    <label key={starIndex}>
                        <FontAwesomeIcon
                            icon={ratingValue <= rating ? faStarSolid : faStarRegular}
                            className="fa-xl"
                            style={{
                                paddingRight: "3px",
                                color: "orange",
                                cursor: "pointer",
                                pointerEvents: isMuted ? "none" : "auto",
                            }}
                            onClick={() => setReviewRate(ratingValue)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default LocationReviewRating;
