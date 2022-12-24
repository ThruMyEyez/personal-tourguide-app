import { useState } from "react";
import { TourMapProviderWrapper } from "../context/tourmapping"
import PreviewPlace from "../components/TourMap/PreviewPlace";
import TourMap from "../components/TourMap/TourMap";
import  Tour  from "../components/Tour";

const PublicTours = () => {
  
  return (
    <>
      <h2 className="p-3">PublicTours page</h2>
      <TourMapProviderWrapper>
      {/* A single tour */}
        <Tour />
      {/* A single tour */}
      </TourMapProviderWrapper>
    </>
  );
};

export default PublicTours;
