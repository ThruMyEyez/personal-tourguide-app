import { useState, useContext } from "react";
import { TourMapContext } from "../context/tourmapping";

import PreviewPlace from "./TourMap/PreviewPlace";
import TourMap from "./TourMap/TourMap";

/*
const CloseOnOutsideClick = ({ children }) => {
  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const { closePreview, togglePreview, setNewPreviewPlace } = useContext(TourMapContext);

  // below is the same as componentDidMount and componentDidUnmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  togglePreview(true);

  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsVisible(false);
      closePreview(false);
    }
  };

  return (
    <div className="menu" ref={wrapperRef}>
      {children}
    </div>
  );
}; */

const RenderEventItem = ({ placesToRender }) => {
  const [startPlace, setStartPlace] = useState(placesToRender[0].position); // get first place coords as startCoords
  const { setPlaces, previewPlace } = useContext(TourMapContext);
  setPlaces(placesToRender);

  return (
    <div className="flex">
      <TourMap startPlace={startPlace} />
      <PreviewPlace place={previewPlace} />
    </div>
  );
};

export default RenderEventItem;
