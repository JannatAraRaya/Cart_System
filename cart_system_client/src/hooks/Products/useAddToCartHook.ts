import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
const useAddToCart = () => {
  const [cart, setCart] = useState<any>([]);
  const addCart = (userId: any, productId: any, quantity: number) => {
    const payload = {
      userId: userId,
      productId: productId,
      quantity: quantity,
    };

    axiosInstance
      .post("/cart/addtoCart", payload)
      .then((response:any) => {
        console.log("Response Data:", response.data);
        setCart(response.data);
      })
      .catch((error:any) => {
        console.error("Error:", error);
      });
  };

  return { cart, addCart };
};


export default useAddToCart;
