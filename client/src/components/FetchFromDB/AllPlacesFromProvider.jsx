import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeletePlace } from "../DashboardComponents";
import { getProviderPlaces } from "../../services/place";

const AllPlacesFromProvider = () => {
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async () => {
    const allProviderPlaces = await getProviderPlaces();
    setPlaces([...allProviderPlaces.data.data]);
    console.log(allProviderPlaces.data.data);
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div className="flex flex-col">
      <h4 className="mx-3 font-semibold">My Curated List of Places</h4>
      <div className="flex flex-wrap">
        {places &&
          places.map((place) => {
            return (
              <div
                key={place._id}
                className="flex justify-center p-3 m-2 rounded shadow-lg w-90 bg-slate-50"
              >
                <div className="flex flex-col bg-white rounded-lg shadow-lg md:flex-row md:max-w-xl">
                  <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src={place.picture}
                    alt={place.tile}
                  />
                </div>
                <div className="flex flex-col justify-start p-6">
                  <h5 className="mb-2 text-xl font-medium text-gray-900">{place.title}</h5>
                  <p className="mb-4 text-base text-gray-700 max-w-[280px]">
                    {" "}
                    {place.description}
                  </p>
                  <div className="flex justify-end">
                    <Link to="/" className="p-1 font-bold bg-indigo-400 rounded">
                      edit
                    </Link>
                    <DeletePlace curPlace={place} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllPlacesFromProvider;
