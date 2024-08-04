import React, { useState } from "react";
//import Data from "./Data";

export const Data = React.createContext();

export const UserContext = ({ children }) => {
  const [state, setState] = useState({
    userName: "",
    emailId: "",
    password: "",
    viewPassword: true,
    userNameError: false,
    mailIdError: false,
    passwordError: false,
    registerStatus: false,
    loginStatus: false
  });
  //const [retrivedData, setRetrivedData] = useState();
  return <Data.Provider value={{ state, setState }}>{children}</Data.Provider>;
};

export default UserContext;
