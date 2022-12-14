import { useNavigate } from "react-router-dom";
import { AddPlace } from "../TourMap";

import React from "react";

const NewPlaceModal = () => {
  const navigate = useNavigate();
  return (
    <div className="fullscreen-modal-container">
      <div className="absolute mx-auto space-y-4 transform -translate-x-1/2 -translate-y-1/2 sm:max-w-sm top-1/2 left-1/2">
        <h1>Add a new Place</h1>

        <button onClick={() => navigate(-1)}>X</button>
        <AddPlace />
      </div>
    </div>
  );
};

export default NewPlaceModal;
