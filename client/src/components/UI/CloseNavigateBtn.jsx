import React from "react";
import { useNavigate } from "react-router-dom";

const CloseNavigateBtn = ({ navigateTo }) => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <button
        className="float-right px-3 py-1 mr-3 text-white bg-black rounded-md"
        onClick={() => navigate(navigateTo)}
      >
        X
      </button>
    </>
  );
};

export default CloseNavigateBtn;
