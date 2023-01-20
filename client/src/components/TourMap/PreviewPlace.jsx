import { useContext } from "react";
import { TourMapContext } from "../../context/tourmapping";

import "./PreviewPlace.css";

const PreviewPlace = () => {
  const { closePreview, showPreview, previewPlace: place } = useContext(TourMapContext);

  return (
    <div
      className={`preview md:mx-auto mx-6 md:rounded-r-lg rounded-lg md:top-auto max-w-full  md:max-w-[33%] bg-[#737373b5] transition-all ease-in-out delay-200  h-[600px] preview--${
        showPreview && place && "active"
      }`}
    >
      <div
        className="absolute text-3xl text-white cursor-pointer right-6 top-4"
        onClick={() => closePreview()}
      >
        X
      </div>
      {/*style={{ backgroundImage: `url(${place?.picture})` }} bg-cover bg-center image-full*/}
      <div className="min-h-[24em]">
        <figure className="h-[24em]">
          <img
            className="w-full object-cover h-[25em] md:rounded-tr-lg md:rounded-none rounded-t-lg"
            src={place?.picture}
            alt={place?.title}
          />
        </figure>
      </div>
      <div className="border-double border-zinc-200 border-l-4 border-r-0 border-t-0 border-b-0 p-3 rounded-b-lg h-[216px] glass md:rounded-br-lg md:rounded-none md:text-center">
        {/* backdrop-blur-[1.5px] */}
        <h4 className="mb-3 font-bold text-zinc-300 ">{place?.title}</h4>
        <p className="mx-3 mb-3 text-sm text-[#484848] text-left font-bold">
          {place?.description}
        </p>
        <a
          className="cursor-pointer text-zinc-200 btn btn-sm btn-primary glass"
          href={place?.moreLink}
          target="_blank"
          rel="noreferrer"
        >
          read more
        </a>
      </div>
    </div>
  );
};

export default PreviewPlace;
