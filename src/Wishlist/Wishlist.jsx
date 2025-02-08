import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import Card from "./../Components/CardComponent";
import EmptyWishlist from "./EmptyWish";
import axiosInstance from "../axiosInstance";
const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    
    let formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    axiosInstance
      .post(
        "api-list-wishlist.php",
        formData,
        
      )
      .then((res) => {
        setWishlistData(res.data.wishlist);
      })
      .catch((Err) => {
        console.log(Err);
      });
  }, []);

  const handleWishlist = (id) => {
    setWishlistData(wishlistData.filter((item) => item.wishlist_id !== id));
  };
  return (
    <div className="wishlist-container">
      <h1 className="wishlist-header">Your Wishlist</h1>
      <div className="wishlist-grid">
        {wishlistData?.length > 0 ? (
          wishlistData.map((item) => (
            <Card
              key={item.product_id}
              name={item.product_name}
              details={item.product_details}
              image={item.product_image}
              price={item.product_price}
              rmvwish="Remove"
              wishid={item.wishlist_id}
              onremove={handleWishlist}
              imgindex={item.product_id}
            />
          ))
        ) : (
          <EmptyWishlist />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
