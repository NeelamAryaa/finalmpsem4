import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import {
  SetQuestionPaper,
  UpdateCurrentSection,
  InitialSetAnswer,
} from "../redux/question/question.actions";

const Card = (props) => {
  const [allQuestionPapers, setAllQuestionPaper] = useState([]);
  // const [currentSection, setCurrentSection] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getAllPaper")
      .then((res) => {
        // console.log(res.data);
        setAllQuestionPaper(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAllquestionsCurrentPaper = (id) => {
    console.log("question paper id", id);
    axios
      .get(`http://localhost:8080/api/getPaper/${id}`)
      .then((res) => {
        // console.log(res.data);
        console.log(props);
        props.UpdateCurrentSection(Object.keys(res.data)[0]);
        props.SetQuestionPaper(res.data);
        // props.InitialSetAnswer();
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("im getallquesfunction");
    console.log(props.questions);
  };

  // const getSection = (id) => {
  //   axios
  //     .get(`http://localhost:8080/api/getSections/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       props.SetQuestionPaper(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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

// const mapStateToProps = (state) => {
//   return {
//     questions: state.index.questions,
//   };
// };

const mapDispatchToprops = (dispatch) => {
  return {
    SetQuestionPaper: (ppr) => dispatch(SetQuestionPaper(ppr)),
    UpdateCurrentSection: (sec) => dispatch(UpdateCurrentSection(sec)),
    // InitialSetAnswer: () => dispatch(InitialSetAnswer()),
  };
};

export default connect(null, mapDispatchToprops)(Card);
