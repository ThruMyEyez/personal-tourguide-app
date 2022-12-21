import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/App.css";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import PublicTours from "./pages/PublicTours";
import PrivateTours from "./pages/PrivateTours";
import IndividualProgram from "./pages/IndividualProgram";
import Calender from "./pages/Calender";
import Dashboard from "./pages/Dashboard";

import Login from "./components/Login";
import PrivRoutes from "./components/PrivRoute";
import SignUp from "./components/SignUp";

const App = () => {
  /* helper vars for modal route logic */
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className="App">
      <Routes location={background || location}>
        <Route path="/" element={<Navbar />}>
          <Route path="/main" element={<Main />} />
          <Route path="/public-tours" element={<PublicTours />} />
          <Route path="/private-tours" element={<PrivateTours />} />
          <Route path="/individual-program" element={<IndividualProgram />} />
          <Route path="/calender" element={<Calender />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} exact />
          </Route>
        </Route>
      </Routes>
      {/* if we have a background object when we click on the modal routes =>
         show the modal conditionally by the second route handler,
         then the pages by <Outlet /> will be shown  */}
      {background && (
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
