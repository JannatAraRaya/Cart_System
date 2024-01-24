import React, { useEffect } from "react";
import useGetCart from "@/hooks/Products/useViewCartHook";
import "./index.scss";
import { jwtDecode } from "jwt-decode";
import useOrder from "@/hooks/Transaction/userOrderHook";
type Props = {};

const Cart = (props: Props) => {
  const { cart, getCart } = useGetCart();
  const {order,postOrder} =useOrder();
  useEffect(() => {
    const check: string | null = localStorage.getItem("token");

    getCart(check);
  }, []);


  const handleOrder= (id: any) => {
    const cart=id;
    console.log(id);
    const check: string | null = localStorage.getItem("token");
  const decodedToken: { user: { _id: string} } | null = check
    ? jwtDecode(check)
    : null;
  const user: string | undefined = decodedToken?.user._id;
  postOrder(cart,user);
    }
  return (
    <div className="show-container">
      <h1>My Cart</h1>
      <div className="show-second-container">
        <div>
          <p>Total: ${cart.Total}</p>
          <p>User: {cart.user}</p>
          <p>Cart: {cart._id}</p>
          <button onClick={(e) => { 
            const id= cart._id
            handleOrder(id) }}>Order</button>
          <hr />

          <h2>Products in Cart:</h2>
          <ul>
            {cart?.products?.map((product:any, index:any) => (
              <li key={index}>
                Product ID: {product?.product}
                <br />
                Quantity: {product?.quantity}
                <br />
                {/* Add more details if needed */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
