"use client"
import React, { useEffect } from "react";
import useGetCart from "@/hooks/Products/useViewCartHook";

import "./index.scss";

type Props = {};

const Cart = (props: Props) => {
  const { cart, getCart} = useGetCart();
  // console.log("products:",products)
  useEffect(() => {
    getCart();
  }, []);



  return (
    <div className="show-container">
      <h1>My Carts</h1>
      <div className="show-second-container">
        <div>
          <p>Total: ${cart.Total}</p>
          <p>User: {cart.user}</p>
          <p>Cart:{cart._id}</p>
          <button>Order</button>
          <hr />
        </div>
      </div>
    </div>
  );
  
};

export default Cart;