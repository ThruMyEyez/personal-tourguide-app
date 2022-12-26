import { GoogleLogin } from "@react-oauth/google";

const GoogleAuth = ({ authSuccessCallback }) => {
  return (
    <div className="text-center">
      <GoogleLogin
        onSuccess={authSuccessCallback}
        onError={() => {
          console.log("Signup / Login with google Failed");
        }}
        useOneTap
      />
    </div>
  );
};

export default GoogleAuth;
