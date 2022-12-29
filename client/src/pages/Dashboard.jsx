import { useContext } from "react";
import { AuthContext } from "../context/authentication";
import DashSidebar from "../components/UI/DashSidebar";
import { IKContext, IKUpload } from "imagekitio-react";

const Dashboard = (props) => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);

  const onFileUploadSuccess = (val) => {
    console.log("File UploadSuccess", val);
  };

  const onFileUploadError = (val) => {
    console.log("File UploadError", val);
    console.log(process.env.REACT_APP_IMAGEKIT_URL);
    console.log(process.env.REACT_APP_SERVER_POINT);
    console.log(process.env.REACT_APP_IMAGEKIT_AUTHENTICTION_ENDPOINT);
  };

  return (
    <div className="flex">
      <DashSidebar />
      <div className="flex flex-col items-center w-full h-screen bg-slate-200">
        <h2 className="p-3">Dashboard</h2>
        <p>just a test</p>
        <p>{(isLoggedIn && `login: ${isLoggedIn}`) || `login: ${isLoggedIn}`}</p>
        {!isLoading && (
          <div>
            <img
              referrerPolicy="no-referrer"
              className="rounded-full"
              src={user.profilePicture}
              alt="Profile"
            />
          </div>
        )}{" "}
        <div className="relative flex items-center justify-center w-12 h-12 m-1 mr-2 text-xl text-white uppercase bg-red-500 rounded-full">
          jc
        </div>
        {/* <ProfileBox /> */}
        <IKContext
          // Displays the image
          urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL}
          // required for uploading
          publicKey={process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY}
          authenticationEndpoint={
            process.env.REACT_APP_SERVER_POINT +
            process.env.REACT_APP_IMAGEKIT_AUTHENTICTION_ENDPOINT
          }
        >
          <IKUpload onSuccess={onFileUploadSuccess} onError={onFileUploadError} />
        </IKContext>
      </div>
    </div>
  );
};
export default Dashboard;
