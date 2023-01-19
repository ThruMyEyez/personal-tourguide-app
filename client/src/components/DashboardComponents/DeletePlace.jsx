import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePlace } from "../../services/place";
import { ConfirmDeleteModal } from "../UI";

export const DeletePlace = ({ curPlace, title, type, offers, setOffers }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteConfirm = (id) => {
    deletePlace(id)
      .then((response) => {
        navigate(0);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  return (
    <>
      <div
        onClick={() => setShowDeleteModal(true)}
        className="px-4 py-2 mx-3 btn btn-sm btn-outline btn-error tooltip tooltip-warning"
        data-tip={`Delete "${curPlace.title}"`}
      >
        Delete
      </div>
      {showDeleteModal ? (
        <ConfirmDeleteModal
          delTitle={curPlace.title}
          delId={curPlace._id}
          setShowModal={setShowDeleteModal}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      ) : null}
    </>
  );
};

export default DeletePlace;
