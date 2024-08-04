import React, { useState } from "react";
//import Data from "./Data";

export const Data = React.createContext();

export const UserContext = ({ children }) => {
  const [state, setState] = useState({
    userName: "",
    emailId: "1@gmail.com",
    password: "1234567890",
    viewPassword: true,
    userNameError: false,
    mailIdError: false,
    passwordError: false,
    registerStatus: false,
    loginStatus: false,
    isUserLogin: false
  });
  //const [retrivedData, setRetrivedData] = useState();
  return <Data.Provider value={{ state, setState }}>{children}</Data.Provider>;
};

export default UserContext;
