import React, { createContext, useState } from "react";
export const FullContext = createContext();

const RootContext = ({ children }) => {
  const [loginPage, setLoginPage] = useState("signup");
  return (
    <FullContext.Provider value={[loginPage, setLoginPage]}>
      {children}
    </FullContext.Provider>
  );
};
export default RootContext;
