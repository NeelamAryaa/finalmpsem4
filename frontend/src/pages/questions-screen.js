import React, { Component, Fragment } from "react";

import axios from "axios";

import QuesScreenLeftPanel from "../components/ques-screen-left-panel";
import QuesScreenRightPanel from "../components/ques-screen-right-panel";
import "../App.css";
import { connect } from "react-redux";
import {
  NextQuestion,
  SetAnswer,
  Unchecked,
  MarkForReview,
  ChangeQuestion,
  IsVisited,
} from "../redux/question/question.actions";

class QuestionsScreen extends Component {
  state = {
    checkedOption: -1,
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:8080/api/getAllQuestions")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateCheckedOption = (value) => {
    this.setState({ checkedOption: value });
  };

  onClickSaveAndNext = () => {
    this.setState({ checkedOption: -1 });

    this.props.NextQuestion();
  };

  onChangeQues = (idx) => {
    this.setState({ checkedOption: -1 });
    this.props.ChangeQuestion(idx);
  };

  clearResponse = () => {
    this.props.Unchecked();
  };

  render() {
    return (
      <Fragment>
        {/*<nav
          className="navbar 
         py-0 px-3 text-white"
          style={{ backgroundColor: "#29385c" }}
        >
          NIMCET - 2021
        </nav>*/}
        <div className="row  mx-0">
          <QuesScreenLeftPanel
            questions={this.props.questions}
            answerArray={this.props.answerArray}
            currentIndex={this.props.currentIndex}
            MarkForReview={this.props.MarkForReview}
            clearResponse={this.clearResponse}
            onClickSaveAndNext={this.onClickSaveAndNext}
            SetAnswer={this.props.SetAnswer}
            updateCheckedOption={this.updateCheckedOption}
            checkedOption={this.state.checkedOption}
            IsVisited={this.props.IsVisited}
            NextQuestion={this.props.NextQuestion}
          />
          <QuesScreenRightPanel
            questions={this.props.questions}
            currentSection={this.props.currentSection}
            onChangeQues={this.onChangeQues}
            updateCheckedOption={this.updateCheckedOption}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentIndex: state.index.currentIndex,
    questions: state.index.questions,
    answerArray: state.index.answerArray,
    currentSection: state.index.currentSection,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    NextQuestion: () => dispatch(NextQuestion()),
    SetAnswer: (idx) => dispatch(SetAnswer(idx)),
    Unchecked: () => dispatch(Unchecked()),
    MarkForReview: () => dispatch(MarkForReview()),
    ChangeQuestion: (idx) => dispatch(ChangeQuestion(idx)),
    IsVisited: () => dispatch(IsVisited()),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(QuestionsScreen);
