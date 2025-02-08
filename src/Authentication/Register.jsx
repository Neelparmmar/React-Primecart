import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const Register = () => {
  let myNavigate = useNavigate();
  const [userData, setuserData] = useState({
    name: "",
    gender: "",
    mobile: "",
    email: "",
    password: "",
    address: "",
  });
  const [msg, setMsg] = useState({ successmsg: "", errmsg: "" });
  const SaveUserData = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };
  const HandleSubmit = (e) => {
    let formData = new FormData();
    formData.append("user_name", userData.name);
    formData.append("user_email", userData.email);
    formData.append("user_password", userData.password);
    formData.append("user_gender", userData.gender);
    formData.append("user_mobile", userData.mobile);
    formData.append("user_address", userData.address);

    axiosInstance.post("api-signup.php", formData).then((res) => {
      console.log(res);

      if (res.data.flag === "1") {
        setMsg({ successmsg: res.data.message });
        localStorage.setItem("user_mobile", res.data.user_mobile);
        localStorage.setItem("user_id", res.data.user_id);
        setTimeout(() => {
          myNavigate("../login");
        }, 2000);
      } else setMsg({ errmsg: res.data.message });
    });
    e.preventDefault();
  };
  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form">
        <label className="register-label">
          Name:
          <input
            type="text"
            name="name"
            onChange={SaveUserData}
            className="register-input"
            placeholder="Enter your name"
          />
        </label>
        <label className="register-label">
          Gender:
          <select
            className="register-select"
            name="gender"
            value={userData.gender}
            onChange={SaveUserData}
            required
          >
            <option>Select Option</option>
            <option name="male" value="male">
              Male
            </option>
            <option name="female" value="female">
              Female
            </option>
          </select>
        </label>

        <label className="register-label">
          Mobile:
          <input
            type="text"
            name="mobile"
            onChange={SaveUserData}
            className="register-input"
            placeholder="Enter your mobile"
          />
        </label>
        <label className="register-label">
          Email:
          <input
            type="email"
            name="email"
            onChange={SaveUserData}
            className="register-input"
            placeholder="Enter your email"
          />
        </label>
        <label className="register-label">
          Password:
          <input
            type="password"
            name="password"
            onChange={SaveUserData}
            className="register-input"
            placeholder="Enter your password"
          />
        </label>
        <label className="register-label">
          Address:
          <input
            type="text"
            name="address"
            onChange={SaveUserData}
            className="register-input"
            placeholder="Enter your address"
          />
        </label>
        <h5 style={{ color: "Green" }}>{msg.successmsg}</h5>
        <h5 style={{ color: "red" }}>{msg.errmsg}</h5>
        <button
          type="submit"
          className="register-button"
          onClick={HandleSubmit}
        >
          Register
        </button>
      </form>
      <p className="register-login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
