import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../services/user";

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

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
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
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="w-12 h-12 mask mask-squircle">
                          <img
                            referrerPolicy="no-referrer"
                            src={profilePicture}
                            alt="Avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {(firstName && firstName) || "firstName"}{" "}
                          {(lastName && lastName) || "lastName"} - {name}
                        </div>
                        <div className="text-sm opacity-50">Germany</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Company Name or Bio?
                    <br />
                    <span className="badge badge-ghost badge-sm">{role}</span>
                  </td>
                  <td>Number</td>
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
