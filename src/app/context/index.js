import React, { createContext, useState } from "react";
export const FullContext = createContext();

const RootContext = ({ children }) => {
  // for Category Page
  const [category, setCategory] = useState("all");
  // for wishlists
  const [side, setSide] = useState(0);

  return (
    <FullContext.Provider value={([category, setCategory], [side, setSide])}>
      {children}
    </FullContext.Provider>
  );
};
export default RootContext;
