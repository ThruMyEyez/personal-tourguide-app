import { useState, useEffect, useContext } from "react";
import { getAllProviderProductItems } from "../../services/product";
import { AuthContext } from "../../context/authentication";
import { EditorView } from "../Editor";
import { HorizontalTextRuler, HorizontalRuler } from "../UI/UIHelper";

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
      <h4>Manage Event's & Guidedtours</h4>
      <div>
        {productItems &&
          productItems.map(({ _id, title, description, eventDate, places }) => {
            //const _description = JSON.parse(description);
            //console.log(_description);
            return (
              <div className="flex flex-col" key={_id}>
                <h5>{title}</h5>
                <HorizontalTextRuler str="description" />
                <EditorView content={description} />
                <HorizontalRuler />
                <p>{eventDate}</p>
                <button>edit</button>
                <button>delete</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OwnProviderProductItems;
