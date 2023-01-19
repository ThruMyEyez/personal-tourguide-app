import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/authentication";
import DashSidebar from "../components/UI/DashSidebar";
import Profile from "./Profile";
import Follow from "../components/Profile/Follow";
import { IKContext, IKUpload } from "imagekitio-react";

import { getProviderProducts, updateEventItem } from "../services/product";

import {
  followUser,
  unfollowUser,
  updateUserRole,
  createProviderProfile,
  updateProviderProfile,
} from "../services/user";
import { getAllEvents, newEventRating } from "../services/event";
import Rating from "../components/Profile/Rating";
import CreateProviderForm from "../components/Profile/CreateProviderForm";
import UpdateProviderForm from "../components/Profile/UpdateProviderForm";
import SubmitRating from "../components/Rating/SubmitRating";
import IsProvider from "../components/AuthComponents/IsProvider";
import UpdateProfile from "../components/Profile/UpdateProfile";

const Dashboard = (props) => {
  const { isLoggedIn, isLoading, user, userFullDetails } =
    useContext(AuthContext);

  // TEST & PROTOTYPE AREA
  // Public Events => All Products
  const handleGetAllEvents = (e) => {
    e.preventDefault();
    getAllEvents()
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        console.log(error);
      });
  };

  // Events => New Event rating!
  const handleNewEventRating = (e) => {
    e.preventDefault();
    newEventRating(
      { stars: 4, comment: "It was exciting tour!" },
      "63bcf64109a3aa67e2c7c668"
    )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        console.log(error);
      });
  };

  // Some other test and prototype
  const handleFormSubmit = (e) => {
    e.preventDefault();
    getProviderProducts("63aa6b493595c079a80b7607")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        console.log(error);
      });
  };

  const handleFormUpdateProductItemSubmit = (e) => {
    e.preventDefault();
    updateEventItem(
      { title: "MeowMeowTour" /*description: JSON.stringify(description) */ },
      "63bce3755b49ac99a7dfbdd6"
    )
      .then((response) => {
        console.log(response.data);
        console.log("Updated ProductItem: ", response.data.data);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        console.log(error);
      });
  };

  // USER SECTION OF TEST & PROTOTYPE
  const handleFollow = (e) => {
    e.preventDefault();
    followUser({ followee: "63a799015619650c6fd8e338" })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        console.log(error);
      });
  };

  const handleUnfollow = (e) => {
    e.preventDefault();
    unfollowUser("63a799015619650c6fd8e338")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        console.log(error);
      });
  };

  const handleUpdateUserRole = (e) => {
    e.preventDefault();
    updateUserRole({ role: "provider" }, "63ad6b5acff822634ee090ff")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        console.log(error);
      });
  };

  const handleCreateProviderProfile = (e) => {
    e.preventDefault();
    createProviderProfile({
      providerType: "Host",
      taxID: "12 345 678 777",
      gallery: [
        "https://images.nordbayern.de/image/contentid/policy:1.4762035:1504305220/skatepark.jpg?f=4%3A3&h=450&m=FIT&w=600&$p$f$h$m$w=097dacd",
      ],
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        console.log(error);
      });
  };

  const handleUpdateProviderProfile = (e) => {
    e.preventDefault();
    updateProviderProfile({
      bio: "This is me, mySelf & I. Welcome to my Bio. I'm a tourguide from...",
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        console.log(error);
      });
  };

  // End of: TEST & PROTOTYPE AREA
  return (
    <div className="flex h-full">
      <DashSidebar />

      <div className="flex flex-col items-center w-full h-screen bg-slate-200">
        {/* <SubmitRating /> */}

        <CreateProviderForm />

        <h1 className="p-3">Dashboard</h1>
        <Outlet />
        <p>test & prototype</p>
        {/* <ProfileBox /> */}
        <form onSubmit={handleGetAllEvents}>
          <button className="btn-primary">
            get All Events/Products from DB - alex
          </button>
        </form>
        <form onSubmit={handleNewEventRating}>
          <button className="btn-primary">
            make rating for Events/Products - alex
          </button>
        </form>
        <form onSubmit={handleFormSubmit}>
          <button className="btn-primary">
            Get All Products for specific Provider "userId" - alex
          </button>
        </form>

        <form onSubmit={handleFormUpdateProductItemSubmit}>
          <button className="btn-primary">
            Update Provider productItem - artur
          </button>
        </form>
        <form onSubmit={handleFollow}>
          <button className="btn-primary">follow userId - joao </button>
        </form>
        {/* Follow/Unfollow could be achieved in one route / component */}
        <form onSubmit={handleUnfollow}>
          <button className="btn-primary">unfollow userId - joao </button>
        </form>
        <form onSubmit={handleUpdateUserRole}>
          <button className="btn-primary">Update user role - alex</button>
        </form>
        <form onSubmit={handleCreateProviderProfile}>
          <button className="btn-primary">
            Create Provider Profile - joao{" "}
          </button>
        </form>
        <form onSubmit={handleUpdateProviderProfile}>
          <button className="btn-primary">
            Update Provider Profile - joao{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
