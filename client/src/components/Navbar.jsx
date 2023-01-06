import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authentication";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const location = useLocation();

  return (
    <>
      <nav className="flex justify-around items-center w-full p-3 bg-clip-pink-violet">
        <ul className="flex m-0 list-none gap-x-3">
          <li className="font-bold pr-3">
            <Link to="/">GuideGo</Link>
          </li>
          <li>
            <Link to="/public-tours">Explore Tours</Link>
          </li>
        </ul>
        <div className="flex gap-x-1 items-center">
          {isLoggedIn && (
            <>
              <span>{user && user.name}</span>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logOutUser}>Log Out</button>
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
                className="login-btn border-2 border-pink-100 hover:bg-gradient-to-r from:pink-500 to:violet-500 hover:text-white rounded-lg pt-2 pb-2 px-3"
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
