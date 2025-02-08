import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css"; // Ensure to import the new CSS file
import axiosInstance from "../axiosInstance";

const ChangePassword = () => {
  let myNavigation = useNavigate();
  const [passinfo, setPassinfo] = useState({
    old: "",
    new: "",
    confirmpass: "",
  });
  const [msg, setMsg] = useState("");

  return (
    <div className="change-password-wrapper">
      <h1 className="change-password-title">Change Password</h1>
      <div className="change-password-input-group">
        <label className="change-password-label">Old Password:</label>
        <input
          type="password"
          className="change-password-input-field"
          onChange={(e) => {
            setPassinfo({ ...passinfo, old: e.target.value });
          }}
        />
      </div>
      <div className="change-password-input-group">
        <label className="change-password-label">New Password:</label>
        <input
          type="password"
          className="change-password-input-field"
          onChange={(e) => {
            setPassinfo({ ...passinfo, new: e.target.value });
          }}
        />
      </div>
      <div className="change-password-input-group">
        <label className="change-password-label">Confirm Password:</label>
        <input
          type="password"
          className="change-password-input-field"
          onChange={(e) => {
            setPassinfo({ ...passinfo, confirmpass: e.target.value });
          }}
        />
      </div>
      <h4 className="change-password-error-message">{msg}</h4>
      <input
        type="button"
        value="Change Password"
        className="change-password-submit-btn"
        onClick={() => {
          let formData = new FormData();
          formData.append("user_id", localStorage.getItem("user_id"));
          formData.append("opass", passinfo.old);
          formData.append("npass", passinfo.new);
          formData.append("cpass", passinfo.confirmpass);
          axiosInstance.post("api-change-password.php", formData).then((res) => {
            setMsg(res.data.message);
            setTimeout(() => {
              myNavigation("../login");
            }, 3000);
          });
        }}
      />
    </div>
  );
};

export default ChangePassword;
