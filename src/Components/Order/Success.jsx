import React from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import "./Success.css";
const Success = () => {
  const mynavigate = useNavigate(); // Using React Router's useHistory hook for navigation

  // Navigate to the order list page
  const handleViewOrder = () => {
    mynavigate("/orderlist");
  };

  return (
    <div className="success-container">
      <div className="success-message">
        <h2>You have successfully placed the order!</h2>
        <p>Thank you for your purchase. Your order is being processed.</p>
        <button className="view-order-button" onClick={handleViewOrder}>
          View Order
        </button>
      </div>
    </div>
  );
};

export default Success;
