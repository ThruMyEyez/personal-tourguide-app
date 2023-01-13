import { useState, useEffect } from "react";

const HandleOffering = ({ offeringFromDB }) => {
  const [offerData, setOfferData] = useState(offeringFromDB);

  return (
    <div>
      <h2>HandleOffering</h2>
    </div>
  );
};

export default HandleOffering;
