import React from "react";
import "../Components/Cart/EmptyCart.css";
import { useNavigate } from "react-router-dom";

const EmptyWishlist = () => {
  const myNavigate = useNavigate();
  return (
    <div className="container">
      <div className="cart-box">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
          alt="Empty Wishlist"
          className="cart-image"
        />
        <h2 className="cart-title">
          Your Wishlist is <span className="cart-empty">Empty!</span>
        </h2>
        <p className="cart-message">
          Must add items to the wishlist before you proceed to checkout.
        </p>
        <button className="cart-button" onClick={() => myNavigate("/")}>
          RETURN TO SHOP
        </button>
      </div>
    </div>
  );
};

export default EmptyWishlist;
