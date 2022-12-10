import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LoginContext, UserContext } from "./context/Context";

import "./App.css";
import Main from "./pages/Main";
import Auth from "./pages/Auth";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [user, setUser] = useState(null);

  //  console.log("Is logged in? ", isLoggedIn);
  //useEffect(() => {

  //}, [isLoggedIn]);
  // useEffect(() => {
  //   api.get("/zag").then(res => {
  //     setData(res.data.data);
  //     console.log(data);
  //   });
  // }, []);

  /* vars vor modals */
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className="App">
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
      </LoginContext.Provider>
    </div>
  );
};

export default App;
