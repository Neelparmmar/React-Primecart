import React, { useEffect, useState } from "react";
import "./Verifyotp.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const Verifyotp = () => {
  const [verifyotp, setVerifyotp] = useState("");
  const [msg, setMsg] = useState({ successmsg: "", errmsg: "" });
  const [counttimer, setCounttimer] = useState(30);
  const [resendCount, setResendCount] = useState(true);
  let myNavigate = useNavigate();
  const ResendOtp = () => {
    let formData = new FormData();
    formData.append("user_mobile", localStorage.getItem("user_mobile"));

    axiosInstance.post("api-otp-resend.php", formData).then((res) => {
      console.log(res);
      if (res.data.flag === "1") {
        setMsg({ successmsg: res.data.message });
      } else setMsg({ errmsg: res.data.message });
    });
  };
  const handleCounter = () => {
    const interval = setInterval(() => {
      setCounttimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendCount(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return interval;
  };

  useEffect(() => {
    const interval = handleCounter();
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("user_mobile", localStorage.getItem("user_mobile"));
    formData.append("mobile_otp", verifyotp);

    axiosInstance.post("api-otp-verify.php", formData).then((res) => {
      console.log(res);
      if (res.data.flag === "1") {
        localStorage.setItem("user_id", res.data.user_id);
        setMsg({ successmsg: res.data.message });
        setTimeout(() => {
          myNavigate("../home");
        }, 2000);
      } else setMsg({ errmsg: res.data.message });
    });
  };

  return (
    <div className="container1">
      <label htmlFor="otp">Verify OTP Page</label>
      <div className="verify-otp-box">
        <div className="input-row">
          <label htmlFor="otp">OTP No:</label>
          <input
            id="otp"
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setVerifyotp(e.target.value)}
          />
        </div>
        <h4 className="verify-otp-message success">{msg.successmsg}</h4>
        <h4 className="verify-otp-message error">{msg.errmsg}</h4>
        <input
          type="button"
          value="Submit"
          className="button"
          onClick={handleSubmit}
        />
        <div className="resend-otp">
          <span>Didn't receive OTP? </span>
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              ResendOtp();
            }}
            data-disabled={resendCount ? "true" : "false"}
            className={`resend-link ${resendCount ? "disabled" : ""}`}
          >
            Resend OTP
          </Link>
          <span className="count-timer">{counttimer}</span>
        </div>
      </div>{" "}
    </div>
  );
};
export default Verifyotp;
