import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authentication";
import { MdBackpack } from "react-icons/md";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser, userFullDetails } =
    useContext(AuthContext);
  const firstChar = isLoggedIn && user.name.charAt(0).toUpperCase();
  const location = useLocation();

  return (
    <>
      <nav className="flex items-center justify-between w-full p-5 text-lg lg:p-3 lg:justify-around bg-clip-pink-violet">
        <div className="link-logo">
          <ul className="flex m-0 list-none">
            <li className="font-bold">
              <Link to="/">GuideGo</Link>
            </li>
            <MdBackpack className="inline-flex my-auto text-pink-500 h-100" />
          </ul>
        </div>
        <SearchBar />
        <div className="flex items-center">
          {isLoggedIn && (
            <>
              <div className="dropdown dropdown-end w-40">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-8 mask mask-hexagon ">
                    {/* hexagon as alternative to rounded-full */}
                    {(user.profilePicture && (
                      <img
                        referrerPolicy="no-referrer" // Google Avatar doesn't render without this attribute!
                        src={
                          (userFullDetails && userFullDetails.profilePicture) ||
                          user.profilePicture
                        }
                        alt="profile"
                      />
                    )) || (
                      <div className="flex items-center justify-center h-8 text-xl text-white uppercase bg-indigo-500 ">
                        {firstChar}
                      </div>
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="p-2 mt-3 text-black shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={logOutUser}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          )}
          {!isLoggedIn && (
            <>
              {/* set the background state for the modals with current router location as background backdrop */}
              <Link
                className="pr-3"
                to="/signup"
                state={{ background: location }}
              >
                Sign up
              </Link>
              <Link
                className="px-3 pt-2 pb-2 mr-3 border-2 border-pink-100 rounded-lg login-btn hover:bg-gradient-to-r from:pink-500 to:violet-500 hover:text-white"
                to="/login"
                state={{ background: location }}
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
