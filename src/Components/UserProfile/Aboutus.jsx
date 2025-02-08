import React, { useEffect, useState } from "react";
import "./Aboutus.css";
import axiosInstance from "../../axiosInstance";

const Aboutus = () => {
  const [aboutData, setaboutData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post("api-list-about-us.php", {})
      .then((res) => {
        if (res.data.flag === "1") {
          setaboutData(res.data.about_list);
          console.log(res.data);
        } else {
          console.log("No About Us data found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching About Us data:", err);
      });
  }, []);

  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <img
        src="https://akashsir.in/myapi/atecom1/upload/akash-technolabs.png"
        alt="Company Logo"
        className="about-logo"
      />
      {aboutData.map((item, index) => (
        <>
          <div className="about-section" key={index}>
            <h2 className="about-heading">{item.about_us_title}</h2>
            <p className="about-text">{item.about_us_description}</p>
          </div>
          <div className="about-section" key={index}>
            <h2 className="about-heading">ON TIME DELIVERY WITH PERFECTION</h2>
            <p className="about-text">
              At Akash Technolabs we have highly professional and experienced
              team of developers. Our main aim is to provide reliable solution
              of your needs by achieving deadlines of projects. Our working
              methodology is designed in such a way that you can get your
              product on time. Our after deployment support is very much active
              and always ready to serve you
            </p>
          </div>
          <div className="about-section" key={index}>
            <h2 className="about-heading">EXCEPTIONAL CUSTOMER SATISFACTION</h2>
            <p className="about-text">
              At Akash Technolabs, client satisfaction is at the heart of
              everything we do. We are committed to providing personalized
              services, understanding your business requirements, and offering
              solutions that add value to your operations. From the initial
              concept to final delivery, we maintain transparency, open
              communication, and a client-first approach. Our dedication to
              excellence and customer support extends even after project
              completion, ensuring seamless performance and adaptability of our
              solutions. Let us help you achieve your business goals with
              unmatched expertise and dedication.
            </p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Aboutus;
