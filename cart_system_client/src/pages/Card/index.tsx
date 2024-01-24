import React from "react";
import "./index.scss";
import { jwtDecode } from "jwt-decode";
import useAddToCart from "@/hooks/Products/useAddToCartHook";

type Props = {
  id: string;
  title: string;
  price: number;
  image: string;
  inStock: number;
  rating: number;
  addToCart: Function;
};

const ProductCart = ({ id, title, price, image, inStock, rating, addToCart }: Props) => {
 const{cart,addCart}=useAddToCart();
 
  const check: string | null = localStorage.getItem("token");
  const decodedToken: { user: { _id: string} } | null = check
    ? jwtDecode(check)
    : null;
  const userId: string | undefined = decodedToken?.user._id;

  
  const handleAddToCart = (id: any) => {
  console.log(id);
  console.log(userId)
  addCart(userId,id,1);

  }


  return (
    <div className="product-cart">
      <img src={image} alt="Product Image" className="product-cart__image" />
      <div className="product-cart__content">
        <h3 className="product-cart__title">{title}</h3>
        <p className="product-cart__price">${price}</p>
        <p className="product-cart__stock">In Stock: {inStock}</p>
        <p className="product-cart__rating">Rating: {rating}</p>
        <button className="product-cart__button" onClick={(e) => { handleAddToCart(id) }}>+</button>
        <button className="product-cart__button" onClick={(e) => { handleAddToCart(id) }}>
          Add To Cart
        </button>
        <button className="product-cart__button">-</button>
      </div>
    </div>
  );
};

export default ProductCart;
