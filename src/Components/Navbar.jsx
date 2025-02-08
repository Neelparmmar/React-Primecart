import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import "./Navbar.css"; // Updated CSS filename
import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axiosInstance from "../axiosInstance";

const ResponsiveNavbar = () => {
  const myNavigate = useNavigate();
  const [Is_login, setIs_login] = useState(localStorage.getItem("user_id"));
  const [SearchProduct, SetSearchProduct] = useState("");
  const [SearchedData, setSearchedData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`api-list-search-product.php?product_name=${SearchProduct}`, {})
      .then((res) => {
        if (res.data.flag === "1") {
          setSearchedData(res.data.product_list);
          console.log(res);
        } else {
          setSearchedData([]);
          console.log("No products found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [SearchProduct]);

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-left">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search products..."
              onChange={(e) => SetSearchProduct(e.target.value)}
              value={SearchProduct}
            />
            <i
              className="fa fa-search search-icon"
              aria-hidden="true"
              onClick={() => console.log("hello")}
            ></i>
          </div>

          {SearchedData.length > 0 && (
            <div className="suggestions-container">
              {SearchedData.map((product, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => {
                    myNavigate(`/productdetails/${product.product_id}`);
                    setSearchedData([]);
                    SetSearchProduct("");
                  }}
                >
                  {product.product_name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="navbar-center">
          <h1 className="website-name">PrimeCart</h1>
        </div>

        <div className="navbar-right">
          <FaHeart className="icon" title="Wishlist" />
          <span className="nav-text" onClick={() => myNavigate("/wishlist")}>
            WishList
          </span>
          <FaShoppingCart className="icon" title="Cart" />
          <span className="nav-text" onClick={() => myNavigate("/addcart")}>
            Cart
          </span>
        </div>
      </nav>

      <div className="second-navbar">
        <Link to="home" className="nav-links">
          Home
        </Link>
        <Link to="category" className="nav-links">
          Category
        </Link>
        <Link to="product" className="nav-links">
          Product
        </Link>

        {Is_login && (
          <>
            <li className="nav-item dropdown">
              <Link
                className="nav-links dropdown-toggle"
                to="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Profile
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/orderlist">
                    My orders
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/myreviews">
                    My Reviews
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/feedback">
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/viewfeedback">
                    View Feedback
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/faq">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/contactus">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/aboutus">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/changepassword">
                    Change Password
                  </Link>
                </li>
              </ul>
            </li>
            <Link
              to=""
              className="nav-links"
              onClick={() => {
                setIs_login(localStorage.removeItem("user_id"));
              }}
            >
              Logout
            </Link>
          </>
        )}
        {!Is_login && (
          <Link to="login" className="nav-links">
            Login
          </Link>
        )}
      </div>
    </>
  );
};

export default ResponsiveNavbar;
