import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./CardComponent";
import axiosInstance from "../axiosInstance";

const Subviewproduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .post(`api-list-product.php?sub_category_id=${id}`, {})
      .then((res) => {
        if (res.data.flag === "1") {
          setProductData(res.data.product_list);
          setisLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Product List</h2>
      <div className="product-container">
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          productData.map((product, index) => {
            return (
              <Card
                key={index}
                name={product.product_name}
                image={product.product_image}
                price={product.product_price}
                imgindex={product.product_id}
                addcardBtn="add to cart"
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Subviewproduct;
