import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../services/product";
import { ConfirmDeleteModal } from "../UI";

const DeleteOwnProduct = ({ curProduct, productId, title, type, offers, setOffers }) => {
  //const [confirmDelete, setConfirmDelete] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteConfirm = (id) => {
    //NEED TO DEBUG!
    deleteProduct(id)
      .then((response) => {
        console.log("res: ", response);
        /*setOffers(
          offers.splice(
            offers.findIndex((product) => product._id === curProduct._id),
            1
          )
        );*/
        navigate(0);
      })
      .catch((error) => {
        console.error(error.response.data);
        console.log(error);
      });
  };

  return (
    <>
      <div
        onClick={() => setShowDeleteModal(true)}
        className="px-4 py-2 mx-3 my-5 text-sm font-medium rounded bg-red-400/60 hover:bg-red-600/80 text-slate-200"
      >
        Delete this
      </div>

      {showDeleteModal ? (
        <ConfirmDeleteModal
          delType={`${curProduct.productType} Offering`}
          delTitle={curProduct.title}
          delId={curProduct._id}
          setShowModal={setShowDeleteModal}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      ) : null}
    </>
  );
};

export default DeleteOwnProduct;
