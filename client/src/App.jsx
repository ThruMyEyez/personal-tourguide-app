import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/App.css";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import PublicTours from "./pages/PublicTours";
import PrivateTours from "./pages/PrivateTours";
import IndividualProgram from "./pages/IndividualProgram";
import Calender from "./pages/Calender";
import Dashboard from "./pages/Dashboard";

import Login from "./components/AuthComponents/Login";
import SignUp from "./components/AuthComponents/SignUp";
import IsPrivate from "./components/AuthComponents/IsPrivate";
import IsAnon from "./components/AuthComponents/IsAnon";

const App = () => {
  const location = useLocation();
  // initialize route as location background backdrop, default location.state: null
  const background = location.state && location.state.background;
  console.log(location);

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

          <Route
            path="/dashboard"
            element={
              <IsPrivate>
                <Dashboard />
              </IsPrivate>
            }
            exact
          />
        </Route>
      </Routes>
      {/* if we have a background object when we click on the modal routes =>
         show the modal conditionally by the second route handler,
         then the pages by <Outlet /> will be shown  */}
      {background && (
        <Routes>
          <Route
            path="/signup"
            element={
              <IsAnon>
                <SignUp />
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <Login />
              </IsAnon>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
