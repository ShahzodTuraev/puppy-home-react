import React, { useEffect, useState } from "react";
import "../../../scss/navbar.scss";
import { Badge, Box, Button, IconButton } from "@mui/material";
import { Add, DeleteOutline, Remove, ShoppingCart } from "@mui/icons-material";
import { Dropdown } from "antd";
import { CartItem } from "../../../types/screen";
import { serverApi } from "../../lib/config";
import { ShoppingCartCont } from "../../context/ShoppingCart";
import { MakeOrderCont } from "../../context/MakeOrder";
import { useNavigate } from "react-router-dom";
import { WishCont } from "../../context/Wishlist";

const Basket = () => {
  /*INITIALIZATIONS*/
  const navigate = useNavigate();
  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart = JSON.parse(cartJson) ?? [];
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);
  const [addToCart] = ShoppingCartCont();
  const orders = MakeOrderCont();
  const setSide = WishCont();
  const onAdd = (product: any) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === product._id
    );
    if (exist) {
      const cart_updated = cartItems.map((item: CartItem) =>
        item._id === product._id
          ? {
              ...exist,
              quantity: exist.quantity + 1,
            }
          : item
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const new_item: CartItem = {
        _id: product._id,
        quantity: 1,
        name: product.product_name,
        price: product.product_price,
        delivery_fee: product.product_delivery_cost,
        discount: product.product_discount,
        image: product.product_images[0],
      };
      const cart_updated = [...cartItems, { ...new_item }];
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onRemove = (item: CartItem) => {
    const item_data: any = cartItems.find(
      (ele: CartItem) => ele._id === item._id
    );
    if (item_data.quantity === 1) {
      const cart_updated = cartItems.filter(
        (ele: CartItem) => ele._id !== item._id
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const cart_updated = cartItems.map((ele: CartItem) =>
        ele._id === item._id
          ? { ...item_data, quantity: item_data.quantity - 1 }
          : ele
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onDelete = (item: CartItem) => {
    const cart_updated = cartItems.filter(
      (ele: CartItem) => ele._id !== item._id
    );
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  };
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart_data");
  };
  useEffect(() => {
    addToCart && onAdd(addToCart[0]);
  }, [addToCart]);
  const itemsPrice = cartItems.reduce(
    (a: any, c: CartItem) =>
      a +
      Math.round((c.price * (100 - c.discount)) / 100 / 10) * 10 * c.quantity,
    0
  );
  const itemsDelivery = cartItems.reduce(
    (a: any, d: CartItem) => a + d.delivery_fee,
    0
  );

  /*HANDLERS*/
  const orderHandler = () => {
    orders[1](1);
    setSide[1](0);
    navigate("/orders");
    onDeleteAll();
  };

  return (
    <Dropdown
      className="account_dropdown"
      placement="bottomRight"
      overlayClassName="shopcart_root"
      dropdownRender={(menu) => (
        <Box className="shopcart_container">
          <Box className="carts_wrap">
            <p
              className={cartItems.length === 0 ? "no_product" : "display_none"}
            >
              No product in Shopping cart
            </p>
            {cartItems.map((item) => {
              const image_path = `${serverApi}/${item.image}`;
              return (
                <Box className="cart_item_box">
                  <img src={image_path} alt="product" />
                  <Box className="title_price_wrap">
                    <p className="item_title">{item.name}</p>
                    <p className="item_price">
                      Price: &#8361;{" "}
                      {item.discount > 0
                        ? Math.round(
                            (item.price - (item.price * item.discount) / 100) /
                              10
                          ) * 10
                        : item.price}
                    </p>
                    <p className="item_delivery">
                      Delivery: &#8361; {item.delivery_fee}
                    </p>
                  </Box>
                  <Box className="item_counter">
                    <Box
                      onClick={() => {
                        onRemove(item);
                      }}
                      className="count_btn"
                    >
                      <Remove className="count_icon" />
                    </Box>
                    <Box className="count_number">{item.quantity}</Box>
                    <Box
                      onClick={() => {
                        onAdd(item);
                      }}
                      className="count_btn"
                    >
                      <Add className="count_icon" />
                    </Box>
                  </Box>
                  <DeleteOutline
                    onClick={() => {
                      onDelete(item);
                    }}
                    className="delete_icon"
                  />
                </Box>
              );
            })}
          </Box>
          {cartItems.length > 0 && (
            <Box className="cart_bottom">
              <p className="total_price">
                Total: &#8361;{itemsPrice + itemsDelivery}{" "}
              </p>
              <Button onClick={orderHandler} className="order_btn">
                Make an order
              </Button>
            </Box>
          )}
        </Box>
      )}
    >
      <Badge badgeContent={cartItems.length} color="primary" className="badge">
        <IconButton className="icon_box cart_icon">
          <ShoppingCart className="icon" />
        </IconButton>
      </Badge>
    </Dropdown>
  );
};

export default Basket;
