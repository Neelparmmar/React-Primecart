import React from "react";
import "./CardComponent.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../axiosInstance";
const Card = ({
  image,
  price,
  name,
  addcardBtn,
  catcardBtn,
  subcatcardBtn,
  index,
  imgindex,
  product,
  rmvwish,
  wishid,
  onremove,
}) => {
  let myNavigate = useNavigate();

  return (
    <div className="main-card">
      <div className="product-card">
        <div className="card-image">
          <img
            src={image}
            alt={name}
            onClick={() => {
              if (imgindex) {
                let myid = `/productdetails/${imgindex}`;
                myNavigate(myid);
              } else {
                console.log("dont have imgindex");
              }
            }}
          />
        </div>
        <div className="card-details">
          <h3 className="product-name">
            {name && name.length > 30
              ? name.slice(0, 30) + "..."
              : name || "No Name Available"}
          </h3>
          <p className="product-price">{price ? `Price : ₹ ${price}` : ""}</p>
          {addcardBtn && (
            <button
              className="add-to-cart"
              onClick={() => {
                let formData = new FormData();
                formData.append("user_id", localStorage.getItem("user_id"));
                formData.append("product_id", imgindex);
                formData.append("product_qty", 1);
                axiosInstance
                  .post("api-add-cart.php", formData)
                  .then(() => {
                    toast.success("Product added to cart successfully!", {
                      closeButton: false, // Removes the close icon
                      autoClose: 3000, // Automatically close after 3 seconds
                      pauseOnHover: false, // Prevents the toast from pausing on hover
                      draggable: false, // Prevents dragging the toast
                      hideProgressBar: true, // Hides the progress bar
                    });
                  })
                  .catch((err) => {
                    toast.error("Something Went Wrong...");

                    console.log(err);
                  });
              }}
            >
              {addcardBtn}
            </button>
          )}{" "}
          {catcardBtn && (
            <button
              className="add-to-cart"
              onClick={() => {
                let myid = `/subcategory/${index}`;
                myNavigate(myid);
              }}
            >
              {catcardBtn}
            </button>
          )}
          {rmvwish && (
            <button
              className="add-to-cart"
              onClick={() => {
                let formData = new FormData();
                formData.append("wishlist_id", wishid);

                axiosInstance
                  .post("api-delete-wishlist.php", formData)
                  .then((res) => {
                    toast.success("Product Successfully removed ");
                    onremove(wishid);
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              {rmvwish}
            </button>
          )}
          {subcatcardBtn && (
            <button
              className="add-to-cart"
              onClick={() => {
                let myid = `/subviewproduct/${index}`;
                myNavigate(myid);
              }}
            >
              {subcatcardBtn}
            </button>
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Card;
