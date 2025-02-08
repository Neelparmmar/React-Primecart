import React, { useState } from "react";
import "./Orderpage.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

function Orderpage() {
  const mynavigate = useNavigate();
  const [shippingData, setShippingData] = useState({
    name: "",
    mobile: "",
    address: "",
    payment: "",
  });
  const SaveData = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };
  const doPlaceOrder = () => {
    let formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("shipping_name", shippingData.name);
    formData.append("shipping_mobile", shippingData.mobile);
    formData.append("shipping_address", shippingData.address);
    formData.append("payment_method", shippingData.payment);
    axiosInstance
      .post("api-add-order.php", formData)
      .then((res) => {
        if (res.data.flag === "1") {
          mynavigate("/success");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="order-page-wrapper">
      <div className="order-page-container">
        <h2>Order Page</h2>
        <label htmlFor="shippingName">Shipping Name:</label>
        <input
          type="text"
          id="shippingName"
          name="name"
          placeholder="Enter your name"
          onChange={SaveData}
        />

        <label htmlFor="shippingMobile">Shipping Mobile:</label>
        <input
          type="text"
          id="shippingMobile"
          name="mobile"
          placeholder="Enter your mobile number"
          onChange={SaveData}
        />

        <label htmlFor="shippingAddress">Shipping Address:</label>
        <input
          type="text"
          id="shippingAddress"
          name="address"
          placeholder="Enter your address"
          onChange={SaveData}
        />

        <label htmlFor="paymentMethod">Payment Method:</label>
        <select id="paymentMethod" name="payment" onChange={SaveData}>
          <option value="">Select payment method</option>
          <option value="credit-card">Credit Card</option>
          <option value="debit-card">Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cod">Cash on Delivery</option>
        </select>

        <button type="submit" onClick={doPlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Orderpage;
