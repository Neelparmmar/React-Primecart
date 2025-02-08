import React, { useEffect, useState } from "react";
import "./Contact-us.css";
import axiosInstance from "../../axiosInstance";

const Contactus = () => {
  const [contactData, setcontactData] = useState([]);

  useEffect(() => {
    axiosInstance.post("api-list-contact-us.php", {}).then((res) => {
      setcontactData(res.data.contact_list);
    });
  }, []);

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
      </div>
      <div className="contact-content">
        {contactData.map((val, index) => (
          <div key={index}>
            <div className="contact-row">
              <span>Phone:</span>
              <a href={`tel:${val.contact_us_number}`}>
                {val.contact_us_number}
              </a>
            </div>
            <div className="contact-row">
              <span>Email:</span>
              <a href={`mailto:${val.contact_us_email}`}>
                {val.contact_us_email}
              </a>
            </div>
            <div className="contact-row">
              <span>Address:</span>
              <p>
                202 Aarya Arcade Above Passport Seva Kendra, Mithakhali Six Rd,
                near Shree Krishana Center, Navrangpura, Ahmedabad, Gujarat
                380009
              </p>
            </div>
            <div className="contact-row">
              <h2>Google Maps</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.759671012821!2d72.56257737514093!3d23.032594779166693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f67844dd69%3A0xe2a1d5031fdf4653!2sAkash%20Technolabs!5e0!3m2!1sen!2sin!4v1737454996510!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contactus;
