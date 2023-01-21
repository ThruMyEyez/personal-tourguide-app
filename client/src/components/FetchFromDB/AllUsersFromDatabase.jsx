import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers, getFullUserDetails } from "../../services/user";
import { getProviderProducts } from "../../services/product";
import Rating from "../Profile/Rating";

const AllUsersFromDatabase = () => {
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    const allUsers = await getAllUsers();
    console.log(allUsers.data.data);
    setUsers([...allUsers.data.data]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Get ammount of Offerings/Products for each Provider
  const GetOfferingsAmount = ({ userId }) => {
    const [offers, setOffers] = useState([]);

    const fetchProviderProducts = async () => {
      const providerOfferings = await getProviderProducts(userId);
      setOffers([...providerOfferings.data.data]);
    };

    useEffect(() => {
      fetchProviderProducts();
    }, []);

    return <>{offers.length}</>;
  };
  //Get company information for each provider
  const GetCompanyName = ({ userId }) => {
    const [companyName, setCompanyName] = useState("No Company");

    const fetchCompanyName = async () => {
      const profile = await getFullUserDetails(userId);
      setCompanyName(profile.data.data.providerProfile?.company);
    };

    useEffect(() => {
      fetchCompanyName();
    }, []);

    return <>{(companyName && companyName) || "No Company"}</>;
  };

  return (
    <div className="w-full mt-3 mb-6 overflow-x-auto">
      <table className="table w-[62%]">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Provider Type</th>
            <th>Offerings</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(({ _id, name, firstName, lastName, profilePicture, role }) => {
              return (
                <tr key={_id}>
                  <td>
                    <div className="flex space-x-3">
                      <div className=" avatar mask mask-squircle">
                        {(profilePicture && (
                          <div className="w-12 h-12 shadow-lg">
                            <img
                              referrerPolicy="no-referrer"
                              src={profilePicture}
                              alt="Avatar"
                            />
                          </div>
                        )) || (
                          <div className="h-12 py-2 text-2xl font-bold text-center uppercase bg-indigo-500 hover:bg-indigo-500 glass text-zinc-200">
                            {name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold">
                          {(firstName && firstName) || "firstName"}{" "}
                          {(lastName && lastName) || "lastName"} - {name}
                        </div>
                        <div className="text-sm opacity-50"> - REGION </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <GetCompanyName userId={_id} />
                    <br />
                    <span className="badge badge-ghost badge-sm">{role}</span>
                  </td>
                  <td>
                    <GetOfferingsAmount userId={_id} />
                  </td>
                  <th>
                    <Link to={`/profile/${_id}`} className="btn btn-ghost btn-xs">
                      details
                    </Link>
                  </th>
                </tr>
              );
            })}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Provider Type</th>
            <th>Offerings</th>
            <th>Profile</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AllUsersFromDatabase;
