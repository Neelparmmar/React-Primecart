import React, { useEffect, useState } from "react";
// import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Carousel from "react-material-ui-carousel";
import "./Main.css";
import Card from "./CardComponent";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import axiosInstance from "../axiosInstance";

const Main = () => {
  const [bannerData, setBannerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerRes = await axiosInstance.post("api-list-slider.php", {});
        if (bannerRes.data.flag === "1") {
          setBannerData(bannerRes.data.banner_list);
        }

        const productRes = await axiosInstance.post("api-list-product.php", {});
        if (productRes.data.flag === "1") {
          setProductData(productRes.data.product_list);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const totalProducts = productData.length;
  const PageSize = 20;
  const NoOfPage = Math.ceil(totalProducts / PageSize);
  const start = currentPage * PageSize;
  const End = start + PageSize;
  const HandleChange = (n) => {
    setcurrentPage(n);
  };
  const HandleNextPage = (n) => {
    setcurrentPage((prev) => prev + 1);
  };
  const HandelPreviosPage = (n) => {
    setcurrentPage((prev) => prev - 1);
  };
  return (
    <main className="main-section">
      {/* Banner Area */}
      {/* Banner Area */}
      <div className="advertisement">
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={200} />
        ) : (
          <Carousel
            indicators={false} // Enable indicators to show the number of slides
            // animation="slide"
            className="banner-carousel"
          >
            {/* Display all banners */}
            {bannerData.map((banner, index) => (
              <div key={banner.banner_id} className="ad-image-container">
                <img
                  src={banner.banner_image} // Use the full URL for each banner image
                  alt={`Banner ${index + 1}`}
                  className="ad-image"
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>

      <div className="shop-header">
        <h2 className="shop-title">Shop Now</h2>
      </div>

      {/* Product List */}
      <div className="product-list">
        {isLoading
          ? [...Array(6)].map((_, index) => (
              <Stack key={index} spacing={2}>
                <Skeleton variant="rectangular" width={210} height={180} />
              </Stack>
            ))
          : productData
              .slice(start, End) // Display a subset of products
              .map((product, index) => (
                <Card
                  key={index}
                  name={product.product_name}
                  price={product.product_price}
                  image={product.product_image}
                  addcardBtn="Add to Cart"
                  imgindex={product.product_id}
                  product={product.product_id}
                />
              ))}
      </div>
      <div className="pagination-container">
        <button
          className="left-rightbtn"
          disabled={currentPage === 0}
          onClick={HandelPreviosPage}
        >
          <FaArrowLeft />
        </button>
        {[...Array(NoOfPage).keys()].map((n) => (
          <button
            key={n}
            className={currentPage === n ? "active page-text" : "page-text"}
            onClick={() => HandleChange(n)}
          >
            {n + 1}
          </button>
        ))}
        <button
          className="left-rightbtn"
          disabled={currentPage === NoOfPage - 1}
          onClick={HandleNextPage}
        >
          <FaArrowRight />
        </button>
      </div>
    </main>
  );
};

export default Main;
