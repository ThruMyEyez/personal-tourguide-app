import { HandlePlace } from "../TourMap";
import { CloseNavigateBtn } from "../UI";

const NewPlaceModal = () => {
  return (
    <div className="z-50 fullscreen-modal-container">
      <div className="overflow-hidden absolute w-2/3 p-2 mx-auto transform -translate-x-1/2 -translate-y-1/2 bg-indigo-200 rounded-lg shadow-xl h-2/3 top-1/2 left-1/2">
        <CloseNavigateBtn navigateTo={-1} />
        <h1>Create a new Place</h1>

        <HandlePlace />
      </div>
    </div>
  );
};

export default NewPlaceModal;
