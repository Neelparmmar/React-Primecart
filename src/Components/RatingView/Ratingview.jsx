import React, { useEffect, useState } from "react";
import "./Ratingview.css"; // Import the CSS file
import axiosInstance from "../../axiosInstance";

const Ratingview = () => {
  const [ratingdata, setRatingdata] = useState([]);
  useEffect(() => {
    axiosInstance
      .post("api-list-rating.php", {})
      .then((res) => {
        if (res.data.flag === "1") {
          console.log(res);
          setRatingdata(res.data.rate_list);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return ratingdata.length > 0 ? (
    <div className="rating-container">
      <h1 className="rating-header">My Reviews</h1>
      <table className="rating-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Rating Date</th>
            <th>Rating Name</th>
            <th>Rating Number</th>
            <th>Rating Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ratingdata.map((val, ind) => (
            <tr key={ind}>
              <td>{val.product_id}</td>
              <td>
                <img
                  src={val.product_image}
                  alt={val.product_name}
                  className="table-image"
                />
              </td>
              <td>{val.product_name}</td>
              <td>{val.rating_date}</td>
              <td>{val.rating_name}</td>
              <td>{val.rating_number} ⭐</td>
              <td>{val.rating_message}</td>
              <td>
                <button className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <h2 style={{marginTop : "3rem"}}>No reviews Available</h2>
  );
};

export default Ratingview;
