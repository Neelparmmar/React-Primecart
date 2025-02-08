import React, { useState } from "react";
import "./Feedback.css";
import { toast, ToastContainer } from "react-toastify"; // Corrected import
import "react-toastify/dist/ReactToastify.css"; // Import styles for toastify
import axiosInstance from "../../axiosInstance";

const Feedback = () => {
  const [rating, setRating] = useState("");
  const [experience, setExperience] = useState("");

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("feedback_rate", rating);
    formData.append("feedback_details", experience);

    axiosInstance
      .post("api-add-feedback.php", formData)
      .then((res) => {
        if (res.data.flag === 1) {
          toast.success("Your Review Added Successfully!", {
            closeButton: false, // Removes the close icon
            autoClose: 3000, // Automatically close after 3 seconds
            pauseOnHover: false, // Prevents the toast from pausing on hover
            draggable: false, // Prevents dragging the toast
            hideProgressBar: true,
          }); // Success toast
          setRating("");
          setExperience("");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong, please try again!"); // Error toast
      });
  };

  return (
    <div className="feedback-container">
      <h2>Website Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rating">Rate Your Experience:</label>
          <select
            id="rating"
            value={rating}
            onChange={handleRatingChange}
            required
          >
            <option value="0">Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="experience">How was your experience?</label>
          <textarea
            id="experience"
            value={experience}
            onChange={handleExperienceChange}
            placeholder="Describe your experience"
            required
          ></textarea>
        </div>

        <button type="submit">Submit Feedback</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Feedback;
