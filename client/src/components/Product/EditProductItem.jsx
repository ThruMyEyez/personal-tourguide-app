import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HandleProductItem } from "../DashboardComponents";
import { getSpecificProductItem } from "../../services/product";

const EditProductItem = () => {
  const [eventItem, setEventItem] = useState(null);
  const { id } = useParams();

  const fetchEventItem = async () => {
    const eventItem = await getSpecificProductItem(id);
    setEventItem(eventItem.data.data);
  };

  useEffect(() => {
    fetchEventItem();
    console.log("eventItemId:", id);
    console.log("eventItem:");
  }, [id]);

  useEffect(() => {
    console.log("eventItem:", eventItem);
  }, [eventItem]);

  return (
    <div className="text-black">
      {eventItem && <HandleProductItem productItem={eventItem} />}
    </div>
  );
};

export default EditProductItem;
