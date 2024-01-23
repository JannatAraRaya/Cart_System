
import React from "react";
import "./index.scss";
import jwt_decode from 'jwt-decode';

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
  return (
    <div className="product-cart">
      <img src={image} alt="Product Image" className="product-cart__image" />
      <div className="product-cart__content">
        <h3 className="product-cart__title">{title}</h3>
        <p className="product-cart__price">${price}</p>
        <p className="product-cart__stock">In Stock: {inStock}</p>
        <p className="product-cart__rating">Rating: {rating}</p>
        <button className="product-cart__button" onClick={() => addToCart(id)}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
