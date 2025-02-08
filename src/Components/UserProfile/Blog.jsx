import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Blog.css";
import axiosInstance from "../../axiosInstance";
const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .post("api-list-blog.php", {})
      .then((res) => {
        if (res.data.flag === "1") {
          console.log(res.data);
          setBlogData(res.data.blog_arr);
        }
      })
      .catch((err) => {
        console.error("Error fetching FAQ:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading blogs...</p>;
  }

  return (
    <div className="blog-container">
      <h1 className="text-center my-4">Blogs</h1>
      <div className="row">
        {blogData.map((blog, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4 shadow-sm border-0">
              <img
                className="card-img "
                src={blog.blog_image || "https://via.placeholder.com/300x200"}
                alt={blog.title || "Blog Image"}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title ">
                  {blog.blog_title || "Untitled Blog"}
                </h5>
                <p className="card-text text-secondary">
                  {blog.blog_detail.slice(0, 300)}.....
                </p>
                <p className="card-text text-muted">Date: {blog.blog_date}</p>
                <a
                  href={blog.link || "#"}
                  className="btn btn-outline-primary btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
