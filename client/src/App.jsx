import { Routes, Route, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import PublicTours from "./pages/PublicTours";
import PrivateTours from "./pages/PrivateTours";
import IndividualProgram from "./pages/IndividualProgram";
import Calender from "./pages/Calender";
import Dashboard from "./pages/Dashboard";

import {
  Login,
  SignUp,
  IsPrivate,
  LostPassword,
  SetPassword,
  IsAnon,
} from "./components/AuthComponents/";

import {
  NewPlaceModal,
  NewProductItem,
  MyOfferings,
  HandleOffering,
} from "./components/DashboardComponents";
import AllProviderProducts from "./components/FetchFromDB/AllProviderProducts";
import AllPlacesFromProvider from "./components/FetchFromDB/AllPlacesFromProvider";
import { OwnProviderProductItems } from "./components/Product";

const App = () => {
  const location = useLocation();
  // initialize route as location background backdrop, default location.state: null
  const background = location.state && location.state.background;

  return (
    <div className="App">
      <Routes location={background || location}>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Main />} />
          <Route path="/public-tours" element={<PublicTours />} />
          <Route path="/private-tours" element={<PrivateTours />} />
          <Route path="/individual-program" element={<IndividualProgram />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/lost-password/:id/:token" element={<SetPassword />} exact />
          <Route path="/provider/:id" element={<AllProviderProducts />} />
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
          >
            <Route path="/dashboard/new-event" element={<NewProductItem />} />
            <Route path="/dashboard/my-events" element={<OwnProviderProductItems />} />
            <Route path="/dashboard/new-offering" element={<HandleOffering />} />
            <Route path="/dashboard/manage-offering/:id" element={<HandleOffering />} />
            <Route path="/dashboard/my-offerings" element={<MyOfferings />} />
            <Route path="/dashboard/places" element={<AllPlacesFromProvider />} />
          </Route>
          <Route
            path="/dashboard/place/create"
            element={
              <IsPrivate>
                <NewPlaceModal />
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
          <Route
            path="/lost-password"
            element={
              <IsAnon>
                <LostPassword />
              </IsAnon>
            }
          />
          <Route
            path="/dashboard/place/create"
            element={
              <IsPrivate>
                <NewPlaceModal />
              </IsPrivate>
            }
            exact
          />
          {/*          <Route
            path="/dashboard/new-event"
            element={
              <IsPrivate>
                <NewProductItemModal />
              </IsPrivate>
            }
            exact
          /> */}
        </Routes>
      )}
    </div>
  );
};

export default App;
