import { useNavigate } from "react-router-dom";
import { AddPlace } from "../TourMap";
import { CloseNavigateBtn } from "../UI";

import React from "react";

const NewPlaceModal = () => {
  const navigate = useNavigate();
  return (
    <div className="fullscreen-modal-container">
      <div className="absolute mx-auto space-y-4 transform -translate-x-1/2 -translate-y-1/2 sm:max-w-sm top-1/2 left-1/2">
        <h1>Create a new Tour or Event</h1>

        <CloseNavigateBtn navigateTo={-1} />
        <AddPlace />
      </div>
    </div>
  );
};

export default NewPlaceModal;
