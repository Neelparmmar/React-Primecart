import React, { useState, useEffect } from "react";
import "./ViewFeedback.css";
import axiosInstance from "../../axiosInstance";
const Viewfeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    handleView();
  }, []);
  const handleView = () => {
    let formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));

    axiosInstance
      .post("api-list-feedback.php", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.flag === 1) {
          setFeedbacks(res.data.feedback_list);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (id) => {
    let formData = new FormData();
    formData.append("feedback_id", id);

    axiosInstance
      .post("api-delete-feedback.php", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.flag === 1) {
          console.log(res);
          handleView();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="feedback-container">
      <h2>Customer Feedback</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Rating</th>
            <th>Experience</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <tr key={index}>
                <td>{feedback.user_name}</td>
                <td>{feedback.feedback_rate}</td>
                <td>{feedback.feedback_details}</td>
                <td>{feedback.feedback_date}</td>
                <td>
                  <input
                    type="button"
                    value="delete"
                    onClick={() => handleDelete(feedback.feedback_id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No feedback available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Viewfeedback;
