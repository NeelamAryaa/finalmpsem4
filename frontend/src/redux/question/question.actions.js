import {
  UPDATE_CURRENT_INDEX,
  ANSWER,
  NEXT_QUESTION,
  UNCHECKED,
  UPDATE_QUES_ARRAY,
  CHANGE_QUESTION,
  UPDATE_SECTION,
  IS_VISITED,
} from "./question.types";

export const NextQuestion = () => {
  return (dispatch, getState) => {
    const { questions, currentIndex, currentSection, answerArray } =
      getState().index;
    const ques = { ...questions };
    const answers = [...answerArray];
    console.log(answers);
    // console.log(currentSection);

    //   if (
    //     Object.keys(questions).length ===
    //     Object.keys(questions).indexOf(currentSection) + 1
    //   ) {
    if (
      answers[Object.keys(questions).indexOf(currentSection)][currentIndex] !==
      -1
    ) {
      ques[currentSection][currentIndex].isAnswered = true;
      dispatch({ type: NEXT_QUESTION, payload: ques });
    }
    //   } else {
    //     if (questions[currentSection].length - 1 > currentIndex) {
    //       ques[currentSection][currentIndex + 1].isVisited = true;
    //     }
    //     dispatch({ type: UPDATE_CURRENT_INDEX, payload: 1 });
    //     dispatch({ type: NEXT_QUESTION, payload: ques });
    //     if (
    //       answers[Object.keys(questions).indexOf(currentSection)][
    //         currentIndex
    //       ] !== -1
    //     ) {
    //       console.log(answers);
    //       console.log(Object.keys(questions).indexOf(currentSection));
    //       ques[currentSection][currentIndex - 1].isAnswered = true;
    //       dispatch({ type: NEXT_QUESTION, payload: ques });
    //     }
    //   }
  };
};

export const SetAnswer = (idx) => {
  return (dispatch) => {
    dispatch({ type: ANSWER, payload: idx });
  };
};

export const Unchecked = () => {
  return (dispatch, getState) => {
    const { questions, currentIndex, answerArray, currentSection } =
      getState().index;
    const ques = { ...questions };
    const ans = [...answerArray];
    ques[currentSection][currentIndex].isAnswered = false;
    ans[Object.keys(questions).indexOf(currentSection)][currentIndex] = -1;
    dispatch({ type: UNCHECKED, payload: { ques: ques, ans: ans } });
  };
};

export const MarkForReview = () => {
  return (dispatch, getState) => {
    const { questions, currentIndex, currentSection } = getState().index;
    const ques = { ...questions };
    ques[currentSection][currentIndex].isReviewed = true;
    dispatch({ type: UPDATE_QUES_ARRAY, payload: ques });
  };
};

export const ChangeQuestion = (idx) => {
  return (dispatch, getState) => {
    const { questions, currentSection } = getState().index;
    const question = { ...questions };
    question[currentSection][idx].isVisited = true;
    dispatch({ type: UPDATE_QUES_ARRAY, payload: question });
    dispatch({ type: CHANGE_QUESTION, payload: idx });
  };
};

export const UpdateCurrentSection = (sec) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_SECTION, payload: sec });
  };
};

export const UpdateCurrentIndex = (value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_CURRENT_INDEX, payload: value });
  };
};

export const IsVisited = () => {
  return (dispatch, getState) => {
    const { questions, currentSection, currentIndex } = getState().index;
    const ques = { ...questions };
    ques[currentSection][currentIndex].isVisited = true;
    dispatch({ type: IS_VISITED, payload: ques });
  };
};
