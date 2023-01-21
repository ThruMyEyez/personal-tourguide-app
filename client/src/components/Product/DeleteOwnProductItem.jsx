import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEventItem } from "../../services/product";
import { ConfirmDeleteModal } from "../UI";

const DeleteOwnProductItem = ({ item }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteConfirm = (id) => {
    deleteEventItem(id)
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
        className="px-4 py-2 my-5 text-zinc-300 btn btn-sm btn-outline tooltip tooltip-warning"
        data-tip={`Delete "${item.title}"`}
      >
        Delete
      </div>
      {showDeleteModal ? (
        <ConfirmDeleteModal
          delTitle={item.title}
          delId={item._id}
          setShowModal={setShowDeleteModal}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      ) : null}
    </>
  );
};

export default DeleteOwnProductItem;
