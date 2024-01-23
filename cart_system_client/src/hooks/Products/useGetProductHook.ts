import axiosIntance from "@/utils/axiosInstance";
import { useState } from "react";

const useGetProduct = () => {
  const [products, setProducts] = useState<any>([]);
  const getAll = () => {
    axiosIntance
      .get("/products/viewall")
      .then((resp:any) => resp.data)
      .then((data:any) => {
        // console.log("Data : ", data.result.result);
        setProducts(data.result.result);
        // return data;
      })
      .catch((error:any) => setProducts([]));
  };
  return { products, getAll };
};
export default useGetProduct;
