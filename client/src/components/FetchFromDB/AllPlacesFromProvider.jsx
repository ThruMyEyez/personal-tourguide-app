import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DeletePlace } from "../DashboardComponents";
import { getProviderPlaces } from "../../services/place";

const PlaceCard = ({ title, picture, description, children }) => {
  return (
    <div className="mx-2 mb-2 bg-indigo-300 shadow-xl card w-96 image-full">
      <figure>
        <img src={picture} alt={title} />
      </figure>
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="overflow-hidden break-words ">{description}</p>
        {children}
      </div>
    </div>
  );
};

/*const card = () => {
  return (
    <div className="shadow-xl card w-96 bg-base-100 image-full">
      <figure>
        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};*/

const AllPlacesFromProvider = () => {
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async () => {
    const allProviderPlaces = await getProviderPlaces();
    setPlaces([...allProviderPlaces.data.data]);
    //console.log(allProviderPlaces.data.data);
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const location = useLocation();

  return (
    <div className="flex flex-col">
      <h4 className="mx-3 font-semibold">My Curated List of Places</h4>
      <div className="flex flex-wrap">
        {places &&
          places.map((place) => {
            //console.log(place.position);
            return (
              <PlaceCard
                key={place._id}
                title={place.title}
                description={place.description}
                picture={place.picture}
              >
                <div className="card-actions">
                  <Link
                    state={location && { background: location }}
                    className="btn btn-sm"
                    to={`/dashboard/place/update/${place._id}`}
                  >
                    Update
                  </Link>
                  <button className="btn btn-sm btn-outline btn-error">delete</button>
                  <DeletePlace curPlace={place} />
                </div>
              </PlaceCard>
            );
          })}
      </div>
    </div>
  );
};

export default AllPlacesFromProvider;

/*
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
*/
