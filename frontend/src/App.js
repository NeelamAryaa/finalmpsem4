import "./App.css";
import React from "react";
import ExamSummary from "./pages/exam-summary";
import Instructions from "./pages/instructions";
import HomePage from "./pages/homepage";
import QuestionsScreen from "./pages/questions-screen";
import { Switch, Route } from "react-router-dom";

import { BrowserRouter as Router } from "react-router-dom";
import ScoreScreen from "./pages/score-screen";

function App() {
  return (
    <Router  basename="/computer-based-test-NIMCET" >
      <div className="App">
        <Switch>
          <Route path="/" component={HomePage} exact />

          <Route path="/instruction" component={Instructions} />

          <Route path="/questionscreen" component={QuestionsScreen} />

          <Route path="/examsummary" component={ExamSummary} />
          <Route path="/score-screen" component={ScoreScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
