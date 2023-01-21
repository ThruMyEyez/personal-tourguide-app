import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authentication";
import { MdBackpack } from "react-icons/md";
import SearchBar from "./SearchBar";
import ThemeButton from "./UI/ThemeButton";
import { HorizontalRuler } from "./UI/UIHelper";
import { SignOut, User, Chalkboard } from "phosphor-react";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser, userFullDetails, setUserFullDetails } =
    useContext(AuthContext);
  const firstChar = isLoggedIn && user.name.charAt(0).toUpperCase();
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-30 flex items-center justify-between w-full p-5 text-lg dark:text-pink-500 text-indigo-500 shadow-md backdrop-blur-sm lg:p-3 lg:justify-around bg-clip-pink-violet">
        <div className="flex justify-end link-logo">
          <ul className="flex m-0 list-none">
            <li className="font-bold">
              <Link to="/">GuideGo</Link>
            </li>
            <MdBackpack className="inline-flex my-auto dark:text-pink-500 h-100" />
          </ul>
        </div>
        <SearchBar />
        <div className="flex items-center">
          {isLoggedIn && (
            <>
              <div className="dropdown dropdown-end w-36">
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
                  <li className="hover:border-l-4 hover:border-primary">
                    <Link to="/dashboard">
                      <Chalkboard size={20} weight="duotone" />
                      Dashboard
                    </Link>
                  </li>
                  <li className="hover:border-l-4 hover:border-primary">
                    <Link to={`/profile/${user._id}`}>
                      <User size={20} weight="duotone" />
                      My Public Profile
                    </Link>
                  </li>
                  <HorizontalRuler />
                  <li
                    onClick={() => setUserFullDetails(null)}
                    className="hover:text-red-500 hover:border-l-4 hover:border-primary"
                  >
                    <button onClick={logOutUser}>
                      <SignOut size={20} weight="duotone" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
          {!isLoggedIn && (
            <>
              {/* set the background state for the modals with current router location as background backdrop */}
              <Link
                className="pr-3 text-indigo-500 dark:text-pink-500"
                to="/signup"
                state={{ background: location }}
              >
                Sign up
              </Link>
              <Link
                className="px-3 pt-2 pb-2 mr-3 text-indigo-500 border-2 border-indigo-500 rounded-lg dark:text-pink-500 dark:border-pink-500 login-btn hover:bg-gradient-to-r dark:hover:bg-gradient-to-l from:indigo-500 to:pink-500 hover:text-white hover:dark:text-white"
                to="/login"
                state={{ background: location }}
              >
                Log in
              </Link>
            </>
          )}
          <ThemeButton className="items-start" />
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
