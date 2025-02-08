import React, { useState } from "react";
import "./Loginotp.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const Loginotp = (e) => {
  const [usermobile, setUsermobile] = useState("");
  const [msg, setMsg] = useState({ successmsg: "", errmsg: "" });
  let myNavigate = useNavigate();
  const handleSubmit = () => {
    let formData = new FormData();

    formData.append("user_mobile", usermobile);

    axiosInstance.post("api-otp-login.php", formData).then((res) => {
      console.log(res);
      if (res.data.flag === "1") {
        localStorage.setItem("user_mobile", res.data.user_mobile);
        localStorage.setItem("user_id", res.data.user_id);
        setMsg({ successmsg: res.data.message });

        setTimeout(() => {
          myNavigate("./verifyotp");
        }, 2000);
      } else setMsg({ errmsg: res.data.message });
    });
  };
  return (
    <div className="container1">
      <label htmlFor="mobile">Login Page</label>
      <div className="loginotp-box">
        <div className="input-row">
          <label htmlFor="mobile">Mobile No:</label>
          <input
            id="mobile"
            type="text"
            min="1"
            max="10"
            placeholder="Enter your mobile number"
            onChange={(e) => {
              setUsermobile(e.target.value);
            }}
          />
          <br />
        </div>
        <h5 style={{ color: "green" }}>{msg.successmsg}</h5>
        <h5 style={{ color: "red" }}>{msg.errmsg}</h5>
        <input
          type="button"
          value="Submit"
          className="button"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Loginotp;
