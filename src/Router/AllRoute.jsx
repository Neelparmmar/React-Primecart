import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../Authentication/Register";
import Login from "../Authentication/Login";
import Home from "../Components/Home";
import Product from "../Components/Product";
import Category from "../Components/Category";
import SubCategory from "../Components/SubCategory";
import ChangePassword from "../Authentication/ChangePassword";
import ProductDetails from "../Components/SinglePage/ProductDetails";
import Subviewproduct from "../Components/Subviewproduct";
import Addcart from "../Components/Cart/Addcart";
import Orderpage from "../Components/Order/Orderpage";
import OrderList from "../Components/Order/OrderList";
import Success from "../Components/Order/Success";
import OrderDetails from "../Components/Order/OrderDetails";
import Wishlist from "../Wishlist/Wishlist";
import Loginotp from "../Authentication/OTP/Loginotp";
import Verifyotp from "../Authentication/OTP/Verifyotp";
import Ratingview from "../Components/RatingView/Ratingview";
import Feedback from "../Components/Feedback/Feedback";
import Viewfeedback from "../Components/Feedback/Viewfeedback";
import ForgetPassword from "../Authentication/ForgetPassword";
import FAQ from "../Components/UserProfile/FAQ";
import Contactus from "../Components/UserProfile/Contact-us";
import Aboutus from "../Components/UserProfile/Aboutus";
import Blog from "../Components/UserProfile/Blog";

const AllRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/addcart" element={<Addcart />} />
        <Route path="/addcart/:id" element={<Addcart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/category" element={<Category />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgetpassword" element={<ForgetPassword />} />
        <Route path="/loginotp" element={<Loginotp />} />
        <Route path="/loginotp/verifyotp" element={<Verifyotp />} />
        <Route path="/myreviews" element={<Ratingview />} />
        <Route path="/orderdetails/:id" element={<OrderDetails />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/placeorder" element={<Orderpage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/subcategory/:id" element={<SubCategory />} />
        <Route path="/subviewproduct/:id" element={<Subviewproduct />} />
        <Route path="/success" element={<Success />} />
        <Route path="/viewfeedback" element={<Viewfeedback />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
};

export default AllRoute;
