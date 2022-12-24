import { useState, useContext } from "react";
import { TourMapContext } from "../context/tourmapping";
import PreviewPlace from "../components/TourMap/PreviewPlace";
import TourMap from "../components/TourMap/TourMap";


const Tour = () => {
  const [startPlace, setStartPlace ] = useState([52.51, 13.38]) // Berlin coordinates // can be removed later
  const {  showPreview, closePreview, places, previewPlace, setNewPreviewPlace, togglePreview } = useContext(TourMapContext);

  return (
    <div>
      <h2>Berlin Tour #1 -tour title-</h2>
      <ul className="flex-col ">
        {places.map(({title}) => <li key={title}>Tour Station: {title} </li>)}
      </ul>
      <div className="flex">
        <TourMap startPlace={ startPlace } places={places} showPreview={showPreview} previewPlace={previewPlace} togglePreview={togglePreview} setNewPreviewPlace={setNewPreviewPlace} />
        <PreviewPlace closePreview={closePreview} showPreview={showPreview} place={previewPlace} />
      </div>
    </div>
  )
}

export default Tour