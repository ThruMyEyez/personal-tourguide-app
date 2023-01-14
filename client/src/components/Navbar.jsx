import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authentication";
import { MdBackpack } from "react-icons/md";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const location = useLocation();

  return (
    <>
      <nav className="flex lg:p-3 p-5 lg:justify-around text-lg justify-between items-center w-full bg-clip-pink-violet">
        <ul className="flex m-0 list-none">
          <li className="font-bold">
            <Link to="/">GuideGo</Link>
          </li>
          <MdBackpack className="mr-6 my-auto h-100 text-pink-500 inline-flex" />
          <li>
            <Link to="/public-tours">Explore Tours</Link>
          </li>
        </ul>
        <div className="flex items-center">
          {isLoggedIn && (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src="https://placeimg.com/80/80/people"
                      alt="profile"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
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
                className="login-btn border-2 border-pink-100 hover:bg-gradient-to-r from:pink-500 to:violet-500 hover:text-white mr-3 rounded-lg pt-2 pb-2 px-3"
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
