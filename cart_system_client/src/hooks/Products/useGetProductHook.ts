import axiosIntance from "@/utils/axiosInstance";
import { useState } from "react";

const useGetProduct = () => {
  const [products, setProducts] = useState<any>([]);
  const getAll = () => {
    axiosIntance
      .get("/products/viewall")
      .then((resp) => resp.data)
      .then((data) => {
        console.log("Data : ", data.result.result);
        setProducts(data.result.result);
        return data;
      })
      .catch((error) => setProducts([]));
  };
  return { products, getAll };
};
export default useGetProduct;
