import React from "react";
import "./EmptyCart.css";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const myNavigate = useNavigate();
  return (
    <div className="container">
      <div className="cart-box">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
          alt="Empty Cart"
          className="cart-image"
        />
        <h2 className="cart-title">
          Your Cart is <span className="cart-empty">Empty!</span>
        </h2>
        <p className="cart-message">
          Must add items to the cart before you proceed to checkout.
        </p>
        <button className="cart-button" onClick={() => myNavigate("/")}>
          RETURN TO SHOP
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
