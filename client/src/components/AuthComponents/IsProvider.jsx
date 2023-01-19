import React from "react";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authentication";

//NOT IN USE

const IsProvider = ({ user, children }) => {
  const { isLoading, userFullDetails } = useContext(AuthContext);

  if (isLoading) return <p>Loading ...</p>;

  if (user && !user.providerProfile) {
  } else {
    // If the user is has a provide Profile, allow to see the page ✅
    return <>{children}</>;
  }
};

export default IsProvider;
