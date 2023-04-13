import "./App.css";
import React from "react";
import ExamSummary from "./pages/exam-summary";
import Instructions from "./pages/instructions";
import HomePage from "./pages/homepage";
import QuestionsScreen from "./pages/questions-screen";
import { Switch, Route } from "react-router-dom";

import { BrowserRouter as Router } from "react-router-dom";
import ScoreScreen from "./pages/score-screen";
import LoginPage from "./components/login";
import NavBar from "./components/navbar";
import SignUpPage from "./components/sign-up";
import PageNotFound from "./pages/404Page";
// import TestSummaryModal from "./components/test-summary-modal";

function App() {
  return (
    <Router basename="/cbt">
      <div className="App">
        {/* <TestSummaryModal /> */}
        {/* <NavBar /> */}
        <SignUpPage />
        <LoginPage />
        <Switch>
          <Route path="/" component={HomePage} exact />

          <Route path="/instruction" component={Instructions} />

          <Route path="/questionscreen/:id" component={QuestionsScreen} />

          <Route path="/examsummary" component={ExamSummary} />
          <Route path="/score-screen" component={ScoreScreen} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
