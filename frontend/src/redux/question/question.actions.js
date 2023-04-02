import {
  UPDATE_CURRENT_INDEX,
  ANSWER,
  IS_ANSWERED,
  UNCHECKED,
  UPDATE_QUES_ARRAY,
  CHANGE_QUESTION,
  UPDATE_SECTION,
  IS_VISITED,
  SET_PAPER,
  INITIAL_ANSWER,
} from "./question.types";

export const SetQuestionPaper = (ppr) => {
  return (dispatch, getState) => {
    const { currentIndex, currentSection, answerArray } = getState().index;

    const ans = {};
    const keys = Object.keys(ppr);

    keys.forEach((key) => {
      ppr[key].forEach((ques) => {
        console.log(ques);
        ques.isVisited = false;
        ques.isReviewed = false;
        ques.isAnswered = false;
        ans[ques.qid] = -1;
        console.log(ans);
      });
    });

    ppr[currentSection][currentIndex].isVisited = true;

    dispatch({ type: SET_PAPER, payload: ppr });
    dispatch({ type: INITIAL_ANSWER, payload: ans });
  };
};

export const SetAnswer = (qid, idx) => {
  return (dispatch, getState) => {
    const { answers } = getState().index;
    const ans = { ...answers };

    ans[qid] = idx;

    console.log("=============setans action", ans);

    dispatch({ type: ANSWER, payload: ans });
  };
};

export const Unchecked = (qid) => {
  return (dispatch, getState) => {
    const { questions, currentIndex, answers, currentSection } =
      getState().index;
    const ques = { ...questions };
    const ans = { ...answers };
    ques[currentSection][currentIndex].isAnswered = false;
    ans[qid] = -1;
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

export const IsAnswered = () => {
  return (dispatch, getState) => {
    const { questions, currentSection, currentIndex } = getState().index;
    const ques = { ...questions };
    ques[currentSection][currentIndex].isAnswered = true;
    dispatch({ type: IS_ANSWERED, payload: ques });
  };
};
