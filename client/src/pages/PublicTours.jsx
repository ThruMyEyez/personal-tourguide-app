import { TourMapProviderWrapper } from "../context/tourmapping";
import RenderEventItem from "../components/RenderEventItem";

const PublicTours = () => {
  return (
    <>
      <h2 className="p-3">Public Tours page</h2>
      <TourMapProviderWrapper>
        {/* A single tour */}
        <RenderEventItem />
        {/* A single tour */}
      </TourMapProviderWrapper>
    </>
  );
};

export default PublicTours;
