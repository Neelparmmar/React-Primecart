import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const Login = () => {
  let myNavigate = useNavigate();
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState({ successmsg: "", errmsg: "" });
  const SaveUserData = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };
  const HandleSubmit = (e) => {
    let formData = new FormData();

    formData.append("user_email", userData.email);
    formData.append("user_password", userData.password);

    axiosInstance
      .post(
        "api-login.php",
        formData,
        
      )
      .then((res) => {
        if (res.data.flag === "1") {
          console.log(res);
          localStorage.setItem("user_id", res.data.user_id);
          localStorage.setItem("user_mobile", res.data.user_mobile);
          setMsg({ successmsg: res.data.message });
          setTimeout(() => {
            myNavigate("../home");
          }, 2000);
        } else setMsg({ errmsg: res.data.message });
      });
    e.preventDefault();
  };

  return (
    <div className="container1">
      <h2 className="title">Login</h2>
      <form className="form">
        <label className="label">
          Email:
          <input
            type="text"
            name="email"
            onChange={SaveUserData}
            className="input"
            placeholder="Enter your email"
          />
        </label>
        <label className="label">
          Password:
          <input
            type="password"
            name="password"
            onChange={SaveUserData}
            className="input"
            placeholder="Enter your password"
          />
        </label>{" "}
        <h5 style={{ color: "Green" }}>{msg.successmsg}</h5>
        <h5 style={{ color: "red" }}>{msg.errmsg}</h5>
        <button type="submit" className="button" onClick={HandleSubmit}>
          Submit
        </button>
      </form>
      <p className="login-link">
        Don't have an account? <Link to="/register">Register here</Link>
        <br />
        Forgot your password? <Link to="/login/forgetpassword">Click here</Link>
        <br />
        Want to log in with OTP? <Link to="/loginotp">Click here</Link>
      </p>
    </div>
  );
};

export default Login;
