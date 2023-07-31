import React, { createContext, useState } from "react";

// Create the context
const UserDetailsContext = createContext();

const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export { UserDetailsContext, UserDetailsProvider };
