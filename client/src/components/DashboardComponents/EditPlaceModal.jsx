import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HandlePlace } from "../TourMap";
import { CloseNavigateBtn } from "../UI";
import { getSpecificPlace } from "../../services/place";

const EditPlaceModal = () => {
  const [place, setPlace] = useState(null);
  const { id } = useParams();

  const fetchPlace = async () => {
    const place = await getSpecificPlace(id);
    setPlace(place.data.data);
  };

  useEffect(() => {
    fetchPlace();
  }, [id]);

  return (
    <div className="z-50 fullscreen-modal-container">
      <div className="absolute w-2/3 h-[91%] p-2 mx-auto space-y-4 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-200 rounded-lg shadow-xl top-1/2 left-1/2">
        <CloseNavigateBtn navigateTo={-1} />
        {place && (
          <>
            <h1>Update selected place</h1>
            <HandlePlace place={place} />
          </>
        )}
      </div>
    </div>
  );
};

export default EditPlaceModal;
