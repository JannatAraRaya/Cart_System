import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
const useAddToCart = () => {
  const [cart, setCart] = useState<any>([]);
  const addToCart = (userId: string, productId: string, quantity: number) => {
    const payload = {
      userId: userId,
      productId: productId,
      quantity: 1,
    };

    axiosInstance
      .post("/cart/addtoCart", payload)
      .then((response) => {
        console.log("Response Data:", response.data);
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return { cart, addToCart };
};


export default useAddToCart;
