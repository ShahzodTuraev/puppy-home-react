import React, { createContext, useContext, useState } from "react";
export const WishlistContext = createContext();
export const WishCont = () => useContext(WishlistContext);
const Wishlists = ({ children }) => {
  const [side, setSide] = useState(0);

  return (
    <WishlistContext.Provider value={[side, setSide]}>
      {children}
    </WishlistContext.Provider>
  );
};
export default Wishlists;
