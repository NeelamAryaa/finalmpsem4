import React, { Component, Fragment } from "react";

import QuesScreenLeftPanel from "../components/ques-screen-left-panel";
import QuesScreenRightPanel from "../components/ques-screen-right-panel";
import "../App.css";
import { connect } from "react-redux";
import {
  SetAnswer,
  Unchecked,
  MarkForReview,
  ChangeQuestion,
} from "../redux/question/question.actions";

class QuestionsScreen extends Component {
  state = {
    checkedOption: -1,
  };

  componentDidMount = () => {
    console.log(this.props.questions);
  };

  updateCheckedOption = (idx) => {
    this.setState({ checkedOption: idx });
  };

  onChangeQues = (idx) => {
    this.setState({ checkedOption: -1 });
    this.props.ChangeQuestion(idx);
  };

  clearResponse = (qid) => {
    this.setState({ checkedOption: -1 });
    this.props.Unchecked(qid);
  };

  render() {
    return (
      <Fragment>
        {Object.keys(this.props.questions).length ? (
          <div className="row  mx-0">
            <QuesScreenLeftPanel
              questions={this.props.questions}
              answers={this.props.answers}
              MarkForReview={this.props.MarkForReview}
              clearResponse={this.clearResponse}
              SetAnswer={this.props.SetAnswer}
              updateCheckedOption={this.updateCheckedOption}
              checkedOption={this.state.checkedOption}
            />
            <QuesScreenRightPanel
              questions={this.props.questions}
              currentSection={this.props.currentSection}
              onChangeQues={this.onChangeQues}
              updateCheckedOption={this.updateCheckedOption}
            />
          </div>
        ) : (
          <>
            <nav
              className="navbar 
         py-0 px-3 text-white"
              style={{ backgroundColor: "#29385c" }}
            >
              NIMCET - 2021
            </nav>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "90vh" }}
            >
              <h1>Question Paper not found</h1>
            </div>
          </>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.index.questions,
    answers: state.index.answers,
    currentSection: state.index.currentSection,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    Unchecked: (qid) => dispatch(Unchecked(qid)),
    MarkForReview: () => dispatch(MarkForReview()),
    ChangeQuestion: (idx) => dispatch(ChangeQuestion(idx)),
    SetAnswer: (qid, idx) => dispatch(SetAnswer(qid, idx)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(QuestionsScreen);
