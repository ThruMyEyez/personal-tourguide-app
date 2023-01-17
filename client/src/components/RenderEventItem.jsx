import { useState, useContext } from "react";
import { TourMapContext } from "../context/tourmapping";

import PreviewPlace from "./TourMap/PreviewPlace";
import TourMap from "./TourMap/TourMap";

const RenderEventItem = ({ placesToRender }) => {
  const [startPlace, setStartPlace] = useState(placesToRender[0].position); // Berlin coordinates // can be removed later
  const { setPlaces, previewPlace } = useContext(TourMapContext);
  setPlaces(placesToRender);
  console.log(placesToRender);
  return (
    <div>
      <div className="flex">
        <TourMap startPlace={startPlace} />
        <PreviewPlace place={previewPlace} />
      </div>
    </div>
  );
};

export default RenderEventItem;
