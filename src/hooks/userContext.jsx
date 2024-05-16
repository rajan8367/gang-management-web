import React, { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userType, setUserType] = useState("admin");

  return (
    <AppContext.Provider value={{ userType, setUserType }}>
      {children}
    </AppContext.Provider>
  );
};

export const useUserContext = () => React.useContext(AppContext);
