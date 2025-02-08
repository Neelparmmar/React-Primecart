import React, { useEffect, useState } from "react";
import "./FAQ.css";
import axiosInstance from "../../axiosInstance";

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post("api-list-faq.php", {})
      .then((res) => {
        if (res.data.flag === "1") {
          setFaqData(res.data.faq_list);
          console.log("opened");
        } else {
          console.log("No FAQ found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching FAQ:", err);
      });
  }, []);

  return (
    <>
      <div className="accordion" id="accordionExample">
        {faqData.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={`collapse${index}`}
              >
                {faq.faq_question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${
                index === 0 ? "show" : ""
              }`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>{faq.faq_answer}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQ;
