import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authentication";
import "./Navbar.scss";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const location = useLocation();

  return (
    <>
      <nav className="bg-clip-pink-violet">
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/public-tours">Öffentliche Führungen</Link>
          </li>
          <li>
            <Link to="/private-tours">Private Führungen</Link>
          </li>
          <li>
            <Link to="/individual-program">Individuelles Programm</Link>
          </li>
          <li>
            <Link to="/calender">Kalender</Link>
          </li>
        </ul>
        <div>
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
              <Link to="/signup" state={{ background: location }}>
                Sign up
              </Link>
              <Link to="/login" state={{ background: location }}>
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
