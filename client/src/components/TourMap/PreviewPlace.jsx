import { useContext } from "react";
import { TourMapContext } from "../../context/tourmapping";

import "./PreviewPlace.css";

const PreviewPlace = () => {
  const { closePreview, showPreview, previewPlace: place } = useContext(TourMapContext);

  return (
    <div
      className={`preview md:top-auto md:w-[33%] bg-[#ffffffb5] transition-all ease-in-out delay-200 w-[100%] h-[100vh] preview--${
        showPreview && place && "active"
      }`}
    >
      <div
        className="absolute text-3xl text-white cursor-pointer right-6 top-4"
        onClick={() => closePreview()}
      >
        X
      </div>
      <div
        className="h-[25vh]  bg-cover bg-center"
        style={{ backgroundImage: `url(${place?.picture})` }}
      ></div>
      <div className="p-2">
        <div className="mb-3 text-lg font-bold">{place?.title}</div>
        <div className="text-sm text-[#484848]">{place?.description}</div>
        <a className="cursor-pointer btn-primary" href={place?.moreLink} target="_blank">
          read more
        </a>
      </div>
    </div>
  );
};

export default PreviewPlace;
