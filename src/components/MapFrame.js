import React from "react";

const MapFrame = ({ location }) => {
  const query = location || "Los Angeles";

  // public key, only accessible from meetupcyclist domain
  const GOOGLE_API_KEY = 'AIzaSyBGBtWBRZ2k9UHUhmiJUKU0Kky4yF4NPSw';

  return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe
      width="400px"
      height="600px"
      style={{
        width: "400px",
        height: "400px",
        border: "0",
      }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${query}`}
    ></iframe>
  );
};

export default MapFrame;
