import React, { useEffect, useState } from "react";
import "./Product.css";
import Card from "./CardComponent";
import { Skeleton } from "@mui/material";
import axiosInstance from "../axiosInstance";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Skeleton should show until data is fetched

  // Fetch product list on initial render
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.post("api-list-product.php", {});
        console.log(response);

        if (response.data.flag === "1") {
          setProductList(response.data.product_list);
          setIsLoading(false);
        } else {
          console.warn("No products found.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false); // Stop loading once API call completes
      }
    };

    fetchProducts();
  }, []);

  // Handle product search
  const handleSearchProduct = async () => {
    if (!searchData.trim()) {
      setSearchResult([]); // Clear search results if search field is empty
      return;
    }

    setIsLoading(true); // Show skeleton while searching

    try {
      const response = await axiosInstance.post(
        `api-list-search-product.php?product_name=${searchData}`,
        {}
      );
      if (response.data.flag === "1") {
        setSearchResult(response.data.product_list);
      } else {
        console.warn("No search results found.");
        setSearchResult([]); // Clear results if no matches are found
      }
    } catch (error) {
      console.error("Error searching for products:", error);
    } finally {
      setIsLoading(false); // Stop loading once search completes
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Product List</h2>
      <div className="main-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search products..."
              onChange={(e) => {
                setSearchData(e.target.value);
                if (!e.target.value.trim()) setSearchResult([]); // Clear search results when input is empty
              }}
            />
            <i
              className="fa fa-search search-icon"
              aria-hidden="true"
              onClick={handleSearchProduct}
            ></i>
          </div>
          <p>Filter Options</p>
        </div>

        {/* Product List */}
        <div className="product-container">
          {isLoading
            ? // Render skeleton loaders while loading
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton-card">
                  <Skeleton variant="rectangular" width="100%" height={150} />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </div>
              ))
            : (searchResult.length > 0 ? searchResult : productList).length > 0
            ? // Render products once loading is complete
              (searchResult.length > 0 ? searchResult : productList).map(
                (product, index) =>
                  index < 30 && (
                    <Card
                      key={index}
                      name={product.product_name}
                      price={product.product_price}
                      image={product.product_image}
                      addcardBtn="Add to Cart"
                      imgindex={product.product_id}
                    />
                  )
              )
            : // Render a message if no products are found
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton-card">
                  <Skeleton variant="rectangular" width="100%" height={150} />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Product;
