import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.css";
import axiosInstance from "../../axiosInstance";

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const mynavigate = useNavigate();
  useEffect(() => {
    let formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("order_id", id);

    axiosInstance
      .post("api-list-order-detail.php", formData)
      .then((res) => {
        if (res.data.flag === "1") {
          console.log(res);
          setOrderDetails(res.data.order_details);
        }
      })
      .catch((err) => {
        console.error("Error fetching order data:", err);
      });
  }, [id]);

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>

      <div className="order-items">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="product-image"
                  />
                </td>
                <td>{item.product_name}</td>
                <td>₹{item.product_price}</td>
                <td>{item.product_qty}</td>
                <td>₹{item.sub_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="viewlist"
        onClick={() => {
          mynavigate("../orderlist");
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default OrderDetails;
