import {IKContext, IKUpload } from "imagekitio-react"

const Dashboard = props => {
  /* const decodedToken = decodeToken(token);
  const isTokenExpired = isExpired(token); */
  const onFileUploadSuccess = (val) => {
    console.log("File UploadSuccess", val);

  }

  const onFileUploadError = (val) => {
    console.log("File UploadError", val);
    console.log(process.env.REACT_APP_IMAGEKIT_URL)
    console.log(process.env.REACT_APP_SERVER_POINT)
    console.log(process.env.REACT_APP_IMAGEKIT_AUTHENTICTION_ENDPOINT)
  }

  return (
    <div className="m-auto">
      <h2 className="btn-primary">Dashboard</h2>
      __________________
      {/* <ProfileBox /> */}
      <IKContext 
        // Displays the image
        urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL}
        // required for uploading
        publicKey={process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY}
        authenticationEndpoint={process.env.REACT_APP_SERVER_POINT + process.env.REACT_APP_IMAGEKIT_AUTHENTICTION_ENDPOINT}
      >
        <IKUpload onSuccess={onFileUploadSuccess} onError={onFileUploadError} />
      </IKContext>
    </div>
  );
};
export default Dashboard;
