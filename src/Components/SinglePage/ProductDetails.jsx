import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../axiosInstance";

const ProductDetails = () => {
  const [productdetails, setProductdetails] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [reviews, setReviews] = useState({ name: "", message: "", rating: "" });
  const { id } = useParams();
  const [displayReview, setDisplayReview] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  // const navigate = useNavigate();

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axiosInstance.post(
          `api-list-product.php?product_id=${id}`,
          {}
        );
        if (res.data.flag === "1") {
          setProductdetails(res.data.product_list);
          setMainImage(res.data.product_list[0].product_image);
        }
      } catch (err) {
        toast.error("Error fetching product details");
      }
    };

    fetchProductDetails();
  }, [id]);

  // Fetch reviews
  const handleDisplayreview = useCallback(async () => {
    let formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("product_id", id);

    try {
      const res = await axiosInstance.post("api-list-rating.php", formData);
      if (res.data.flag === "1") {
        setDisplayReview(res.data.rate_list);
      }
    } catch (err) {
      toast.error("Error fetching reviews");
    }
  }, [id]);

  useEffect(() => {
    handleDisplayreview();
  }, [handleDisplayreview]);

  // Add review
  const AddReview = async () => {
    let formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("product_id", id);
    formData.append("rating_name", reviews.name);
    formData.append("rating_number", reviews.rating);
    formData.append("rating_message", reviews.message);

    try {
      const res = await axiosInstance.post("api-add-rating.php", formData);
      if (res.data.flag === 1) {
        toast.success("Review added successfully!");
        await handleDisplayreview();
        setShowReviewForm(false);
      } else {
        toast.error("Failed to add review");
      }
    } catch (err) {
      toast.error("Error adding review");
    }
  };

  const handleRating = (e) => {
    setReviews({ ...reviews, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="product-details-header">
        <h1>Product Details</h1>
      </div>
      <div className="product-details-container">
        {productdetails.map((val, index) => (
          <div key={index} className="product-details-content">
            {/* Image Section */}
            <div className="image-section">
              <div className="extra-images-container">
                {val.images &&
                  val.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${val.product_name} - Extra ${i + 1}`}
                      className="extra-image-card"
                      onClick={() => {
                        const temp = mainImage;
                        setMainImage(img);
                        val.images[i] = temp;
                      }}
                    />
                  ))}
              </div>
              <div className="main-product-image">
                <img src={mainImage} alt={val.product_name} />
              </div>
            </div>
            {/* Product Info Section */}
            <div className="product-info-container">
              <h2>{val.product_name}</h2>
              <p>{val.product_details}</p>
              <div className="product-quantity">
                <span>Quantity: 1</span>
              </div>
              <div className="product-price">
                <span>Price: ₹{val.product_price}</span>
              </div>
              <div className="product-actions">
                <button
                  className="addtocart"
                  onClick={() => {
                    let formData = new FormData();
                    formData.append("user_id", localStorage.getItem("user_id"));
                    formData.append("product_id", val.product_id);
                    formData.append("product_qty", 1);
                    axiosInstance
                      .post("api-add-cart.php", formData)
                      .then(() => {
                        toast.success("Product added to cart successfully!", {
                          closeButton: false, // Removes the close icon
                          autoClose: 3000, // Automatically close after 3 seconds
                          pauseOnHover: false, // Prevents the toast from pausing on hover
                          draggable: false, // Prevents dragging the toast
                          hideProgressBar: true, // Hides the progress bar
                        });
                      })

                      .catch(() => {
                        toast.error("Failed to add product to cart");
                      });
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="addtowishlist"
                  onClick={() => {
                    let formData = new FormData();
                    formData.append("user_id", localStorage.getItem("user_id"));
                    formData.append("product_id", val.product_id);
                    axiosInstance
                      .post("api-add-wishlist.php", formData)
                      .then(() => {
                        toast.success("Added to Wishlist!", {
                          closeButton: false,
                          autoClose: 3000,
                          pauseOnHover: false,
                          draggable: false,
                          hideProgressBar: true,
                        });
                        // navigate("../wishlist");
                      })
                      .catch(() => {
                        toast.error("Failed to add to Wishlist", {
                          closeButton: false,
                          autoClose: 3000,
                          pauseOnHover: false,
                          draggable: false,
                          hideProgressBar: true,
                        });
                      });
                  }}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="product-review-section">
          <h3 className="review-title">Customer Reviews</h3>
          {displayReview.length > 0 ? (
            <div className="review-table-container">
              <table className="review-table">
                <thead className="review-header">
                  <tr>
                    <th className="review-header-name">Name</th>
                    <th className="review-header-name">Rating</th>
                    <th className="review-header-name">Review</th>
                    <th className="review-header-name">Email</th>
                    <th className="review-header-name">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {displayReview.map((review, index) => (
                    <tr key={index} className="review-row">
                      <td className="review-name">{review.rating_name}</td>
                      <td className="review-rating">
                        {review.rating_number} / 5
                      </td>
                      <td className="review-message">
                        {review.rating_message}
                      </td>
                      <td className="review-email">{review.rating_email}</td>
                      <td className="review-date">{review.rating_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-reviews-container">
              <p className="no-reviews-message">
                No reviews yet. Be the first to share your thoughts about this
                product!
              </p>
              <button
                className="add-review-btn"
                onClick={() => setShowReviewForm(true)}
              >
                Add a Review
              </button>
            </div>
          )}
        </div>

        {showReviewForm && (
          <div className="review-form-container">
            <h3>Add Your Review</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="review-name">Name</label>
                <input
                  type="text"
                  id="review-name"
                  name="name"
                  className="form-input"
                  placeholder="Enter your name"
                  value={reviews.name}
                  onChange={handleRating}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="review-rating">Rating (out of 5)</label>
                <input
                  type="number"
                  id="review-rating"
                  name="rating"
                  className="form-input"
                  min="1"
                  max="5"
                  placeholder="Rate the product"
                  value={reviews.rating}
                  onChange={handleRating}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="review-message">Message</label>
                <textarea
                  id="review-message"
                  name="message"
                  className="form-input"
                  placeholder="Write your review"
                  value={reviews.message}
                  onChange={handleRating}
                  required
                ></textarea>
              </div>
              <button
                type="button"
                className="submit-review-btn"
                onClick={() => {
                  AddReview();
                  setShowReviewForm(false);
                }}
              >
                Submit
              </button>
            </form>
            <ToastContainer />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
