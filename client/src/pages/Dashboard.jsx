import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/authentication";
import { ThemeContext } from "../context/theme";
import DashSidebar from "../components/UI/DashSidebar";
import CreateProviderForm from "../components/Profile/CreateProviderForm";

const Dashboard = (props) => {
  const { isLoggedIn, isLoading, user, userFullDetails } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  // TEST & PROTOTYPE AREA
  // Events => New Event rating!
  /* const handleNewEventRating = (e) => {
    e.preventDefault();
    newEventRating({ stars: 4, comment: "It was exciting tour!" }, "63bcf64109a3aa67e2c7c668")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        console.log(error);
      });
  };

  // Some other test and prototype

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
  };*/
  /*const handleUpdateUserRole = (e) => {
    e.preventDefault();
    updateUserRole({ role: "provider" }, "63ad6b5acff822634ee090ff")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        console.log(error);
      });
  };*/

  console.log(theme);
  // End of: TEST & PROTOTYPE AREA
  return (
    <div className="flex h-full">
      <DashSidebar />

      <div
        className={
          "flex flex-col items-center w-full h-screen  bg-[url('https://mini.codingcodax.dev/images/dark-beams.jpg')] "
        }
      >
        {/* <SubmitRating /> */}

        <CreateProviderForm />

        <h1 className="p-6 mx-3 my-5 glass text-[2em] font-semibold shadow-xl badge badge-info badge-outline">
          Dashboard
        </h1>

        <Outlet />

        {/*
        <p>test & prototype</p>
        <form onSubmit={handleNewEventRating}>
          <button className="btn-primary">make rating for Events/Products - alex</button>
        </form>

        <form onSubmit={handleFollow}>
          <button className="btn-primary">follow userId - joao </button>
        </form>*
         Follow/Unfollow could be achieved in one route / component 
        <form onSubmit={handleUnfollow}>
          <button className="btn-primary">unfollow userId - joao </button>
        </form>
         <form onSubmit={handleUpdateUserRole}>
          <button className="btn-primary">Update user role - alex</button>
        </form>*/}
      </div>
    </div>
  );
};

export default Dashboard;
