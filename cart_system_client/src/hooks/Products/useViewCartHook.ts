import axiosIntance from "@/utils/axiosInstance";
import { useState } from "react";

const useGetCart = () => {
  const [cart, setCarts] = useState<any>([]);
  const getCart = () => {
    axiosIntance
      .post("/cart/view")
      .then((resp:any) => resp.data)
      .then((data:any) => {
         console.log("Data : ", data.result.result);
        setCarts(data.result.result);
        return data;
      })
      .catch((error:any) => setCarts([]));
  };
  return { cart, getCart };
};
export default useGetCart;
