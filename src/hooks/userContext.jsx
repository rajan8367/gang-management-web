import React, { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userType, setUserType] = useState("admin");
  const [customMsg, setCustomMsg] = useState({
    isVisible: false,
    text: "",
    type: "error",
  });
  const [user, setUser] = useState({
    name: "Rajan Yadav ",
    email: "rajan@velocis.com",
    role: "sso",
  });

  return (
    <AppContext.Provider
      value={{ userType, setUserType, customMsg, setCustomMsg, user, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useUserContext = () => React.useContext(AppContext);
