import { Link, Outlet, useLocation } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/main">Main</Link>
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
          <Link to="/signup" state={{ background: location }}>
            Sign up
          </Link>
          <Link to="/login" state={{ background: location }}>
            Log in
          </Link>
          {/*TODO: If user logged in hide auth buttons and show Profile/Dashboard && and a nested Logout */}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
