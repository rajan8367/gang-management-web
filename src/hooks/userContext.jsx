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
    type: "SSO",
    addresses: [
      {
        city: "Lucknow",
      },
    ],
  });
  const [token, setToken] = useState("");

  return (
    <AppContext.Provider
      value={{
        userType,
        setUserType,
        customMsg,
        setCustomMsg,
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useUserContext = () => React.useContext(AppContext);
