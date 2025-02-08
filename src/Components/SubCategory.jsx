import React, { useEffect, useState } from "react";
import Card from "./CardComponent";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const SubCategory = () => {
  const [subcategorydata, setSubcategorydata] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    axiosInstance
      .post(`api-list-subcategory.php?category_id=${id}`, {})
      .then((res) => {
        if (res.data.flag === "1") {
          console.log(res.data);
          setSubcategorydata(res.data.sub_category_list);
          setisLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <>
      <h2 style={{ textAlign: "center" }}>SubCategory List</h2>
      <div className="product-container">
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          subcategorydata.map((product, index) => (
            <Card
              key={index}
              name={product.sub_category_name}
              image={product.sub_category_image}
              price={product.category_price}
              index={product.sub_category_id}
              subcatcardBtn="View Product"
            />
          ))
        )}
      </div>
    </>
  );
};

export default SubCategory;
