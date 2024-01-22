import React, { createContext, useContext, useState } from "react";
export const ShoppingCartContext = createContext();
export const ShoppingCartCont = () => useContext(ShoppingCartContext);

const ShoppingCartItem = ({ children }) => {
  const [addToCart, setAddToCart] = useState(null);

  return (
    <ShoppingCartContext.Provider value={[addToCart, setAddToCart]}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
export default ShoppingCartItem;
