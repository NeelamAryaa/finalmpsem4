import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const Card = () => {
  const [allQuestionPapers, setAllQuestionPaper] = useState([]);
  const [questionPapers, setQuestionPaper] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getAllPaper")
      .then((res) => {
        console.log(res.data);
        setAllQuestionPaper(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAllquestionsCurrentPaper = (id) => {
    axios
      .get("http://localhost:8080/api/getPaper")
      .then((res) => {
        console.log(res.data);
        setQuestionPaper(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {allQuestionPapers
        ? allQuestionPapers.map((ppr, idx) => (
            <div
              key={idx}
              className="card w-75 mx-auto my-5 text-start shadow bg-white rounded"
            >
              <h5
                className="card-header text-white"
                style={{ background: "#8a8b8c" }}
              >
                {ppr.paper_name} - {ppr.year}
              </h5>
              <div className="card-body">
                {/* <h5 className="card-title">Your score : {ppr.total_marks}</h5> */}
                <div className="card-text w-50 d-flex justify-content-between">
                  <div>Questions : {ppr.total_ques}</div>
                  <div>Marks : {ppr.total_marks}</div>
                  <div>Time : {ppr.total_time} mintues</div>
                </div>
                <Link
                  to="/instruction"
                  onClick={() => getAllquestionsCurrentPaper(ppr.qp_id)}
                >
                  <div className="btn btn-primary mt-3">Start Test</div>
                </Link>
              </div>
            </div>
          ))
        : null}
    </>
  );
};

export default Card;
