import React, { useEffect, useState } from "react";
import "./OrderList.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const OrderList = () => {
  const [orderlist, setOrderlist] = useState([]);
  const mynavigate = useNavigate();
  useEffect(() => {
    let formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));

    axiosInstance
      .post("api-list-order.php", formData)
      .then((res) => {
        if (res.data.flag === "1") {
          setOrderlist(res.data.order_list);
        }
      })
      .catch((err) => {
        console.error("Error fetching order data:", err);
      });
  }, []);

  return (
    <div className="order-list-container">
      <h2>Order List</h2>
      {orderlist.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Order Date</th>
              <th>Order No</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderlist.map((order, index) => (
              <tr key={order.order_id}>
                <td>{index + 1}</td>
                <td>{order.order_date}</td>
                <td>{"#Order-" + order.order_id}</td>
                <td>{order.order_status}</td>
                <td>{order.payment_method}</td>
                <td>₹{order.total_amount}</td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => {
                      let myid = `/orderdetails/${order.order_id}`;
                      mynavigate(myid);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;
