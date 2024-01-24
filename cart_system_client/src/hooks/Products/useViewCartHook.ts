import axiosIntance from "@/utils/axiosInstance";
import { useState } from "react";

const useGetCart = () => {
  const [cart, setCarts] = useState<any>([]);
  const getCart = (check:any) => {
    axiosIntance
    .get("/cart/view", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${check}`,
      },
    })
      .then((resp:any) => resp.data)
      .then((data:any) => {
         console.log("Data : ", data.result);
        setCarts(data.result);
        return data;
      })
      .catch((error:any) => setCarts([]));
  };
  return { cart, getCart };
};
export default useGetCart;
