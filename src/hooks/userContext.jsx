import React, { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userType, setUserType] = useState("admin");
  const [customMsg, setCustomMsg] = useState({
    isVisible: false,
    text: "",
    type: "error",
  });

  return (
    <AppContext.Provider
      value={{ userType, setUserType, customMsg, setCustomMsg }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useUserContext = () => React.useContext(AppContext);
