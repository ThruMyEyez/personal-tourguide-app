import { useNavigate } from "react-router-dom";

/* This is the default close btn. It takes a location and navigates to it */
/* ToDo: Change char "X" to a svg */
const CloseNavigateBtn = ({ navigateTo }) => {
  const navigate = useNavigate();
  return (
    <>
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
