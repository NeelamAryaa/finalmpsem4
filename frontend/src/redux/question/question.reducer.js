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

const questions = {
  mathematics: [
    {
      section: "mathematics",
      question:
        "How many words starting with letter D can be formed by taking all letters from word DELHI, so that the letters are not repeated?",
      option: [24, 46, 28, 30],
    },
    {
      section: "mathematics",
      question: "How many words starting with letter D ?",
      option: [4, 16, 28, 30],
    },
  ],

  "analitical reasoning": [
    {
      section: "analitical_reasoning",
      question:
        "Sum of ages of Anu and Bhanu is 10 years more than sum of ages of Bhanu, Chanu and Dhanu. Average age of Chanu and Dhanu is 19 years. Find the average age of Anu and Dhanu if Dhanu is 10 years elder than Chanu.",
      option: [25, 36, 31, 30],
    },
    {
      section: "analitical_reasoning",
      question:
        "Sum of ages of Anu and Bhanu is 10 years more than sum of ages of Bhanu, Chanu and Dhanu.",
      option: [5, 60, 13, 30],
    },
  ],

  computer: [
    {
      section: "computer",
      question:
        "The memory unit which directly communicates with the CPU is known as",
      option: [
        "primary memory",
        "secondary memory",
        "cache memory",
        "shared memory",
      ],
    },
    {
      section: "computer",
      question:
        "The first instruction of bootstrap loader program of an operating system is stored in",
      option: ["bios", "ram", "cache memory", "rom"],
    },
  ],

  english: [
    {
      idx: 0,
      section: "english",
      question: "Choose the correct expression of approval:",
      option: ["none", "damn", "rotten", "hell"],
    },
    {
      section: "english",
      question: "Choose the incorrect expression of approval:",
      option: ["super", "damn", "rotten", "all of these"],
    },
    {
      section: "english",
      question: "Choose the correct expression of not approval:",
      option: ["super", "damn", "rotten", "hell"],
    },
  ],
};

let ques = { ...questions };
const keys = Object.keys(ques);

keys.forEach((key) => {
  ques[key].forEach((ques) => {
    ques.isVisited = false;
    ques.isReviewed = false;
    ques.isAnswered = false;
  });
});

const INITIAL_STATE = {
  questions: ques,
  currentIndex: 0,
  answerArray: [],
  currentSection: Object.keys(ques)[0],
};

ques[INITIAL_STATE.currentSection][INITIAL_STATE.currentIndex].isVisited = true;

for (const key in ques) {
  INITIAL_STATE.answerArray.push(new Array(ques[key].length).fill(-1));
}
// console.log(INITIAL_STATE.answerArray);

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEXT_QUESTION:
      return {
        ...state,
        questions: action.payload,
      };

    case UPDATE_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.payload,
      };

    case ANSWER:
      const newarray = [...state.answerArray];
      // console.log(newarray);
      newarray[Object.keys(state.questions).indexOf(state.currentSection)][
        state.currentIndex
      ] = action.payload;

      return {
        ...state,
        answerArray: newarray,
      };

    case UNCHECKED:
      return {
        ...state,
        questions: action.payload.ques,
        answerArray: action.payload.ans,
      };

    case UPDATE_QUES_ARRAY:
      return {
        ...state,
        questions: action.payload,
      };

    case CHANGE_QUESTION:
      return {
        ...state,
        currentIndex: action.payload,
      };

    case UPDATE_SECTION:
      return {
        ...state,
        currentSection: action.payload,
      };
    case IS_VISITED:
      return {
        ...state,
        questions: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
