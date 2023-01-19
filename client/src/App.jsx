import { Routes, Route, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import PublicTours from "./pages/PublicTours";
import PrivateTours from "./pages/PrivateTours";
import IndividualProgram from "./pages/IndividualProgram";
import Dashboard from "./pages/Dashboard";
import EventDetails from "./pages/EventDetails";

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
  HandleProductItem,
  MyOfferings,
  HandleOffering,
  EditPlaceModal,
} from "./components/DashboardComponents";
import AllProviderProducts from "./components/FetchFromDB/AllProviderProducts";
import AllPlacesFromProvider from "./components/FetchFromDB/AllPlacesFromProvider";
import { OwnProviderProductItems } from "./components/Product";
import EditProfilePictureModal from "./components/Profile/EditProfilePictureModal";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

const App = () => {
  const location = useLocation();
  // initialize route as location background backdrop, default location.state: null
  const background = location.state && location.state.background;

  return (
    <div className="App">
      <Routes location={background || location}>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile self={true} />} />
          <Route path="/profile/edit" element={<Profile self={true} />} />

          <Route path="/profile/:id" element={<Profile self={false} />} />
          <Route path="/public-tours" element={<PublicTours />} />
          <Route path="/private-tours" element={<PrivateTours />} />
          <Route path="/individual-program" element={<IndividualProgram />} />
          <Route
            path="/lost-password/:id/:token"
            element={<SetPassword />}
            exact
          />
          <Route path="/provider/:id" element={<AllProviderProducts />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/purchase/:id" />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route
            path="/dashboard"
            element={
              <IsPrivate>
                <Dashboard />
              </IsPrivate>
            }
            exact
          >
            <Route
              path="/dashboard/new-event"
              element={<HandleProductItem />}
            />
            <Route
              path="/dashboard/edit-event/:id"
              element={<EditProductItem />}
            />
            <Route
              path="/dashboard/my-events"
              element={<OwnProviderProductItems />}
            />
            <Route
              path="/dashboard/new-offering"
              element={<HandleOffering />}
            />
            <Route
              path="/dashboard/manage-offering/:id"
              element={<HandleOffering />}
            />
            <Route path="/dashboard/my-offerings" element={<MyOfferings />} />
            <Route
              path="/dashboard/places"
              element={<AllPlacesFromProvider />}
            />
            <Route
              path="/dashboard/place/create"
              element={<NewPlaceModal />}
              exact
            />
            <Route
              path="/dashboard/place/update/:id"
              element={<EditPlaceModal />}
              exact
            />
            <Route
              path="/dashboard/profile"
              element={<Profile self={true} />}
            />
            <Route path="/dashboard/profile/edit" element={<EditProfile />} />
          </Route>
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
          <Route
            path="/dashboard/place/update/:id"
            element={<EditPlaceModal />}
            exact
          />
          <Route
            path="/profile/edit/picture"
            element={<EditProfilePictureModal />}
            exact
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
