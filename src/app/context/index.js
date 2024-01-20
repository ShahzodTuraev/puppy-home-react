import React, { createContext, useState } from "react";
export const FullContext = createContext();

const RootContext = ({ children }) => {
  const [category, setCategory] = useState("all");
  return (
    <FullContext.Provider value={[category, setCategory]}>
      {children}
    </FullContext.Provider>
  );
};
export default RootContext;
