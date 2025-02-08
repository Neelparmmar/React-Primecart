import React, { useEffect, useState } from "react";
import Card from "./CardComponent";
import { Skeleton } from "@mui/material";
import axiosInstance from "../axiosInstance";
const Category = () => {
  const [categoryData, setcategoryData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .post("api-list-category.php", {})
      .then((res) => {
        if (res.data.flag === "1") {
          setcategoryData(res.data.category_list);
          setisLoading(false);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Category List</h2>
      <div className="product-container">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="skeleton-card">
                <Skeleton variant="rectangular" width="100%" height={150} />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </div>
            ))
          : categoryData.map((product, index) => (
              <Card
                key={index}
                name={product.category_name}
                image={product.category_image}
                catcardBtn="View SubCategory"
                index={product.category_id}
              />
            ))}
      </div>
    </>
  );
};

export default Category;
