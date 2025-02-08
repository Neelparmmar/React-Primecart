import React, { useState } from "react";
import "./ForgetPassword.css"; // Assuming the CSS is saved in a separate file.
import Swal from "sweetalert2"; // Correct import
import axiosInstance from "../axiosInstance";

const ForgetPassword = () => {
  const [userInfo, setuserInfo] = useState("");

  const handleSubmit = () => {
    let formData = new FormData();

    formData.append("user_email", userInfo);

    axiosInstance
      .post("api-user-forgot-password.php", formData)
      .then((res) => {
        if (res.data.flag === 1) {
          Swal.fire({
            // title: "Good job!",
            text: res.data.message,
            icon: "success",
          });
          setuserInfo(" ");
          console.log(res.data);
        } else {
          Swal.fire({
            title: "Oops!",
            text: res.data.message || "Something went wrong. Please try again.",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: error.message || "Something went wrong. Please try again.",
          icon: "error",
        });
      });
  };

  return (
    <div className="container1">
      <h1 className="title">Forget Password</h1>
      <div className="form">
        <div className="label">
          Email:
          <input
            type="text"
            className="input"
            placeholder="Enter your email"
            onChange={(e) => {
              setuserInfo(e.target.value);
            }}
          />
        </div>
        <button className="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <p className="login-link">
        Remembered your password? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default ForgetPassword;
