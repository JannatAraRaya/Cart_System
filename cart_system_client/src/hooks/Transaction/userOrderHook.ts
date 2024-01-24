import axiosIntance from "@/utils/axiosInstance";
import { useState } from "react";

const useOrder = () => {
  const [order, setOrder] = useState<any>([]);
  const postOrder = (cart:any,user:any) => {

    const payload = {
        cart:cart,
        user:user
      };
    axiosIntance
    .post("/transaction/order",payload)
      .then((resp:any) => resp.data)
      .then((data:any) => {
         console.log("Data : ", data.result);
         setOrder(data.result);
        
        const url =data.result;
        console.log(url.GatewayPageURL)
         window.location.replace(url.GatewayPageURL);
        // return data;
      })
      .catch((error:any) => setOrder([]));
  };
  return { order, postOrder };
};
export default useOrder;
