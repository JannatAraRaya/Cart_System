"use client"
import React, { useEffect } from "react";
import useGetProduct from "@/hooks/Products/useGetProductHook";
import ProductCard from "../../components/Card";

//import "./index.scss";

type Props = {};

const Products = (props: Props) => {
  const { products, getAll} = useGetProduct();
  console.log("products:",products)
  useEffect(() => {
    getAll();
  }, [products]);

  const addToCart = (id: string) => {
    console.log(id);
  };

  return (
    <div className="products">
    {Array.isArray(products) ? (
      products.map((product: any) => (
        <ProductCard
          key={product._id}
          id={product._id}
          title={product.title}
          price={product.price}
          image={product.image}
          inStock={product.inStock}
          rating={product.rating}
          addToCart={addToCart}
        />
      ))
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
  
};

export default Products;