// Import dependencies
import React, { useEffect, useState } from "react";
import "./Addcart.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import EmptyCart from "./EmptyCart";
import axiosInstance from "../../axiosInstance";

const Addcart = () => {
  const [cartData, setCartData] = useState([]);
  const [GrandTotal, setGrandTotal] = useState("");
  let myNavigate = useNavigate();
  // Fetch cart data
  const fetchCartData = () => {
    let formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));

    axiosInstance
      .post("api-list-cart.php", formData)
      .then((res) => {
        if (res.data.flag === "1") {
          setCartData(res.data.cart_list);
          setGrandTotal(res.data.grand_total);
        } else {
          console.log("No cart data found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching cart data:", err);
      });
  };

  // Decrease Quantity
  const decreaseQty = (val) => {
    let formData = new FormData();
    formData.append("cart_id", val.cart_id);
    formData.append("product_qty", val.product_qty - 1);
    axiosInstance
      .post("api-update-cart.php", formData)
      .then((res) => {
        if (res.data.flag === "1") {
          console.log(res);

          fetchCartData();
        } else {
          console.log("Failed to decrease quantity.");
        }
      })
      .catch((err) => {
        console.error("Error decreasing quantity:", err);
      });
  };

  // Increase Quantity
  const increaseQty = (val) => {
    let formData = new FormData();
    formData.append("cart_id", val.cart_id);
    formData.append("product_qty", ++val.product_qty);

    axiosInstance
      .post("api-update-cart.php", formData)
      .then((res) => {
        if (res.data.flag === "1") {
          console.log(res);

          fetchCartData();
        } else {
          console.log("Failed to increase quantity.");
        }
      })
      .catch((err) => {
        console.error("Error increasing quantity:", err);
      });
  };

  // Delete Item
  const handleDelete = (id) => {
    let formData = new FormData();
    formData.append("cart_id", id);

    axiosInstance
      .post("api-delete-cart.php", formData)
      .then((res) => {
        if (res.data.flag === "1") {
          toast.success("Product deleted successfully", {
            closeButton: false,
            autoClose: 3000,
            pauseOnHover: false,
            draggable: false,
            hideProgressBar: true,
          });

          setCartData((prevData) =>
            prevData.filter((item) => item.cart_id !== id)
          );


          setTimeout(() => {
            fetchCartData();
          }, 600);
        } else {
          toast.error("Something Went Wrong", {
            closeButton: false,
            autoClose: 3000,
            pauseOnHover: false,
            draggable: false,
            hideProgressBar: true,
          });
        }
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartData();
  }, []);

  return cartData.length > 0 ? (
    <div className="cart-container1">
      <>
        <table className="cart-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((val, ind) => (
              <tr key={val.product_id}>
                <td>{ind + 1}</td>
                <td>
                  <img
                    src={val.product_image}
                    alt={val.product_name}
                    className="product-image"
                  />
                </td>
                <td>{val.product_name}</td>
                <td>
                  <div className="qty-control1">
                    <button
                      className="qty-button1"
                      onClick={() => decreaseQty(val)}
                    >
                      -
                    </button>
                    <span>{val.product_qty}</span>
                    <button
                      className="qty-button1"
                      onClick={() => increaseQty(val)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>₹{val.product_price}</td>
                <td>₹{val.product_price * val.product_qty}</td>
                <td>
                  <button
                    className="delete-button1"
                    onClick={() => handleDelete(val.cart_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="grand-total1">Grand Total: ₹{GrandTotal}</div>
        <button
          className="place-order-button"
          onClick={() => myNavigate("/placeorder")}
        >
          Place Order
        </button>
      </>

      <ToastContainer />
    </div>
  ) : (
    <EmptyCart />
  );
};

export default Addcart;
