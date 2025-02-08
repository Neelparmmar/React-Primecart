import React from "react";
import AllRoute from "./Router/AllRoute";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./App.css";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="page-container">
      <div className="content">
        {location.pathname !== "/change-password" &&
          location.pathname !== "/login" &&
          location.pathname !== "/register" &&
          location.pathname !== "/loginotp" &&
          location.pathname !== "/loginotp/verifyotp" &&
          location.pathname !== "/login/forgetpassword" && <Navbar />}

        <AllRoute />
      </div>
      {location.pathname !== "/change-password" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/loginotp" &&
        location.pathname !== "/loginotp/verifyotp" &&
        location.pathname !== "/login/forgetpassword" && <Footer />}
    </div>
  );
}

export default App;
