import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../hook/useCart";

const Cart = () => {
  const { handleGetCartItems } = useCart();
  const items = useSelector((state) => state.cart.items);
  console.log(items);
  useEffect(() => {
    handleGetCartItems();
  }, []);

  console.log(items[0]?.length);

  return <div>Cart</div>;
};

export default Cart;
