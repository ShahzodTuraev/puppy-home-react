import React from "react";
import CategoryContext from "./Category";
import ShoppingCartContext from "./ShoppingCart";
import WishlistContext from "./Wishlist";
import MakeOrderContext from "./MakeOrder";

export const Context = ({ children }) => {
  return (
    <CategoryContext>
      <ShoppingCartContext>
        <MakeOrderContext>
          <WishlistContext>{children}</WishlistContext>
        </MakeOrderContext>
      </ShoppingCartContext>
    </CategoryContext>
  );
};

export default Context;
