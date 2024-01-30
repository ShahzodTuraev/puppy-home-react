import React from "react";
import CategoryContext from "./Category";
import ShoppingCartContext from "./ShoppingCart";
import WishlistContext from "./Wishlist";
import MakeOrderContext from "./MakeOrder";
import SearchContext from "./Search";

export const Context = ({ children }) => {
  return (
    <SearchContext>
      <CategoryContext>
        <ShoppingCartContext>
          <MakeOrderContext>
            <WishlistContext>{children}</WishlistContext>
          </MakeOrderContext>
        </ShoppingCartContext>
      </CategoryContext>
    </SearchContext>
  );
};

export default Context;
