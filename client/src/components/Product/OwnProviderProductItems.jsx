import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getAllProviderProductItems } from "../../services/product";
import { AuthContext } from "../../context/authentication";
import { EditorView } from "../Editor";
import { HorizontalTextRuler, HorizontalRuler } from "../UI/UIHelper";
import DeleteOwnProductItem from "./DeleteOwnProductItem";

const OwnProviderProductItems = () => {
  const [productItems, setProductItems] = useState([]);

  const { isLoading, user } = useContext(AuthContext);

  const fetchProductItems = async () => {
    if (!isLoading) {
      const allOwnProviderItems = await getAllProviderProductItems(user._id);
      setProductItems([...allOwnProviderItems.data.data]);
      console.log(allOwnProviderItems.data.data);
    }
  };

  useEffect(() => {
    fetchProductItems();
  }, []);

  return (
    <div>
      <h4>Manage your Events</h4>
      <div>
        {productItems &&
          productItems.map((item) => {
            return (
              <div className="flex flex-col" key={item._id}>
                <h5>{item.title}</h5>
                <HorizontalTextRuler str="description" />
                <EditorView content={item.description} />
                <HorizontalRuler />
                <p>{item.eventDate}</p>
                <Link
                  // state={location && { background: location }}
                  className="btn btn-sm"
                  to={`/dashboard/edit-event/${item._id}`}
                >
                  Edit
                </Link>

                <DeleteOwnProductItem item={item} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OwnProviderProductItems;
